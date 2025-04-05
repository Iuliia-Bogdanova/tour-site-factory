// burger-меню
const mp = new MobilePanel({
    navbar: ".nav-bar",
});

// Универсальная функция для обновления любого свойства CSS в зависимости от ширины окна с любыми единицами изменения
function updateDynamicProperty(
    propertyName,
    minValue,
    maxValue,
    unit,
    minWidth,
    maxWidth
) {
    const windowWidth = Math.min(window.innerWidth, maxWidth);

    let value =
        minValue +
        ((windowWidth - minWidth) * (maxValue - minValue)) /
            (maxWidth - minWidth);
    document.documentElement.style.setProperty(
        `--${propertyName}`,
        `${value}${unit}`
    ); // unit - единица измерения
}
// динамическое изменение margin-right в .nav__icon--open
window.addEventListener("load", () => {
    updateDynamicProperty("margin-right", 6, 47, "rem", 360, 1023);
});

window.addEventListener("resize", () => {
    updateDynamicProperty("margin-right", 6, 47, "rem", 360, 1023);
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
            prevSlideMessage: "Предыдущий слайд",
            nextSlideMessage: "Следующий слайд",
        },
    });
});

// stats__value counter
function animateCounter(element, endValue, duration) {
    let startValue = 0;
    let current = startValue;
    const increment = endValue / (duration / 16);

    function updateCounter() {
        current += increment;
        if (current >= endValue) {
            element.textContent = endValue;
        } else {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        }
    }

    updateCounter();
}
// Определить функцию запуска анимации
function startCounting() {
    const counters = document.querySelectorAll(".stats__value");

    counters.forEach((counter) => {
        const endValue = parseInt(counter.textContent, 10);
        counter.textContent = "0";
        animateCounter(counter, endValue, 2000);
    });
}
// Определить блок, в котором находится счетчик
const statsSection = document.querySelector(".row.justify-content-between");

if (statsSection) {
    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    startCounting();
                    observer.unobserve(entry.target); // чтобы сработал 1 раз
                }
            });
        },
        {
            threshold: 0.9, // сработает на 90% видимости блока
        }
    );

    observer.observe(statsSection);
}
