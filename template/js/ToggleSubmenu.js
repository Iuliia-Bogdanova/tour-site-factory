// document.addEventListener("DOMContentLoaded", function () {
//     const parentItem = document.querySelector(".nav__item--parent");
//     const link = parentItem.querySelector(".nav__link");
//     const sublist = parentItem.querySelector(".nav__sublist");

//     // function toggleMenu() {
//     //     const isOpen = sublist.classList.contains("open");
//     //     sublist.classList.toggle("open", !isOpen);
//     //     link.classList.toggle("active", !isOpen);
//     // }

//     function toggleMenu() {
//         const isOpen = sublist.classList.contains("open");

//         if (isOpen) {
//             sublist.style.height = sublist.scrollHeight + "px"; // Установить высоту перед закрытием
//             requestAnimationFrame(() => {
//                 sublist.style.height = "0";
//                 sublist.classList.remove("open");
//             });
//         } else {
//             sublist.style.height = "0"; // Сбросить, чтобы анимация сработала
//             sublist.classList.add("open");
//             requestAnimationFrame(() => {
//                 sublist.style.height = sublist.scrollHeight + "px";
//             });
//         }
//     }

//     function closeMenu() {
//         sublist.classList.remove("open");
//         link.classList.remove("active");
//     }

//     link.addEventListener("click", function (event) {
//         if (window.innerWidth < 1024) {
//             event.preventDefault();
//             toggleMenu();
//         }
//     });

//     link.addEventListener("mouseenter", function () {
//         if (window.innerWidth >= 1024) {
//             sublist.classList.add("open");
//             link.classList.add("active");
//         }
//     });

//     parentItem.addEventListener("mouseleave", function () {
//         if (window.innerWidth >= 1024) {
//             closeMenu();
//         }
//     });
// });
