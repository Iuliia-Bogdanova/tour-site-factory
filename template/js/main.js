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

// меню
// document.addEventListener("DOMContentLoaded", function () {
//     const parentItems = document.querySelectorAll(".nav__item--parent");

//     parentItems.forEach((parent) => {
//         const link = parent.querySelectorAll(".nav__link");
//         const submenu = parent.querySelectorAll(".nav__sublist");

//         // Создаем обработчик клика для псевдоэлемента (используем сам .nav__link)
//         link.addEventListener("click", function (event) {
//             if (window.innerWidth < 1024) {
//                 event.preventDefault(); // Отмена перехода по ссылке

//                 // Переключаем класс для открытия/закрытия
//                 submenu.classList.toggle("open");
//                 link.classList.toggle("active"); // Для поворота псевдоэлемента
//             }
//         });

//         // Для десктопа (≥1024px) - hover + клик
//         if (window.innerWidth >= 1024) {
//             parent.addEventListener("mouseenter", function () {
//                 submenu.classList.add("open");
//                 link.classList.add("active");
//             });

//             parent.addEventListener("mouseleave", function () {
//                 submenu.classList.remove("open");
//                 link.classList.remove("is-active");
//             });

//             link.addEventListener("click", function (event) {
//                 event.preventDefault();
//                 submenu.classList.toggle("is-open");
//                 link.classList.toggle("is-active");
//             });
//         }
//     });
// });

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
