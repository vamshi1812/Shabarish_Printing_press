const carouselPrevBtn = document.querySelector('.carousel-prev');
const carouselNextBtn = document.querySelector('.carousel-next');
const testimonialSlides = Array.from(document.querySelectorAll('.testimonial-slide'));
let currentSlideIndex = 0;

function showTestimonialSlide() {
  testimonialSlides.forEach((slide, index) => {
    if (index === currentSlideIndex) {
      slide.style.display = 'block';
    } else {
      slide.style.display = 'none';
    }
  });
}

function nextTestimonialSlide() {
  currentSlideIndex++;
  if (currentSlideIndex >= testimonialSlides.length) {
    currentSlideIndex = 0;
  }
  showTestimonialSlide();
}

function prevTestimonialSlide() {
  currentSlideIndex--;
  if (currentSlideIndex < 0) {
    currentSlideIndex = testimonialSlides.length - 1;
  }
  showTestimonialSlide();
}

carouselNextBtn.addEventListener('click', nextTestimonialSlide);
carouselPrevBtn.addEventListener('click', prevTestimonialSlide);

// Initially show the first slide
showTestimonialSlide();