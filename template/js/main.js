// burger-меню
const mp = new MobilePanel({
  'navbar': '.nav-bar'
});

// Swiper слайдер
document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".swiper-container", {
      loop: true,
      initialSlide: 1,
      slidesPerView: 1,
      spaceBetween: 15,
      centeredSlides: true,
      navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
      },
      pagination: {
          el: ".swiper-pagination",
          clickable: true,
          dynamicBullets: true,
          dynamicMainBullets: 1,
      },
      a11y: {
        prevSlideMessage: 'Предыдущий слайд',
        nextSlideMessage: 'Следующий слайд',
      },
  });
});
