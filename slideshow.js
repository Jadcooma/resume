document.addEventListener('DOMContentLoaded', () => {
  window.slideshowManager = new SlideshowManager();
  window.slideshowManager.slideshows.forEach((slideshow) => {
    slideshow.showSlides(1)
  });
  document.querySelectorAll(".project > img.screenshot").forEach((img, index) => {
    img.addEventListener('click', () => {
      window.slideshowManager.setCurrentSlideshow(index);
      window.slideshowManager.currentSlideshow.openModal();
      window.slideshowManager.currentSlideshow.currentSlide(1);
    });
  });
});

class SlideshowManager {
  constructor() {
    this.slideshows = this.createSlideshows();
    this.currentSlideshow = null;
  }

  /**@return {Slideshow[]} The slideshows created from each slideshow container*/
  createSlideshows() {
    return Array.from(document.querySelectorAll("[data-slideshow-name]")).map((container) => 
      new Slideshow(container.dataset.slideshowName)
    );
  }

  /**@return {Slideshow} The current slideshow in use */
  setCurrentSlideshow(index) {
    return this.currentSlideshow = this.slideshows[index];
  }
}

class Slideshow {
  constructor(name) {
    this.name = name;
    this.slideIndex = 1;
    this.container = document.querySelector(`[data-slideshow-name=${name}]`);
    this.slides = this.container.getElementsByClassName('slide');
    this.caption = this.container.querySelector("#caption");
  }

  openModal() {
    this.container.style.display = 'block';
  }
  
  closeModal() {
    this.container.style.display = 'none';
  }
  
  plusSlides(n) {
    this.showSlides(this.slideIndex += n);
  }
  
  currentSlide(n) {
    this.showSlides(this.slideIndex = n);
  }
  
  showSlides(n) {
    if (n > this.slides.length) 
      {this.slideIndex = 1}
    if (n < 1) 
      {this.slideIndex = this.slides.length}
    for (var i = 0; i < this.slides.length; i++) {
        this.slides[i].style.display = 'none';
    }
    this.slides[this.slideIndex-1].style.display = 'block';
    this.caption.innerHTML = this.slides[this.slideIndex-1].querySelector('img').alt;
  }
}