// document.addEventListener("DOMContentLoaded", function () {
//     const parentItem = document.querySelectorAll(".nav__item--parent");
//     const link = parentItem.querySelectorAll(".nav__link");
//     const sublist = parentItem.querySelectorAll(".nav__sublist");

//     function toggleMenu() {
//         const isOpen = sublist.classList.contains("open");
//         sublist.classList.toggle("open", !isOpen);
//         link.classList.toggle("active", !isOpen);
//     }

//     // function toggleMenu() {
//     //     const isOpen = sublist.classList.contains("open");

//     //     if (isOpen) {
//     //         sublist.style.height = sublist.scrollHeight + "px"; // Установить высоту перед закрытием
//     //         requestAnimationFrame(() => {
//     //             sublist.style.height = "0";
//     //             sublist.classList.remove("open");
//     //         });
//     //     } else {
//     //         sublist.style.height = "0"; // Сбросить, чтобы анимация сработала
//     //         sublist.classList.add("open");
//     //         requestAnimationFrame(() => {
//     //             sublist.style.height = sublist.scrollHeight + "px";
//     //         });
//     //     }
//     // }

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

document.addEventListener("DOMContentLoaded", function () {
    const parentItems = document.querySelectorAll(".nav__item--parent");

    parentItems.forEach((parent) => {
        const link = parent.querySelector(".nav__link");
        const sublist = parent.querySelector(".nav__sublist");

        function toggleMenu() {
            const isOpen = sublist.classList.contains("open");
            sublist.classList.toggle("open", !isOpen);
            link.classList.toggle("active", !isOpen);
        }

        function closeMenu() {
            sublist.classList.remove("open");
            link.classList.remove("active");
        }

        // Клик на псевдоэлемент для открытия/закрытия (на мобилке)
        link.addEventListener("click", function (event) {
            if (window.innerWidth < 1024) {
                event.preventDefault();
                toggleMenu();
            }
        });

        // Наведение на десктопе
        parent.addEventListener("mouseenter", function () {
            if (window.innerWidth >= 1024) {
                sublist.classList.add("open");
                link.classList.add("active");
            }
        });

        // Уход с элемента на десктопе
        parent.addEventListener("mouseleave", function () {
            if (window.innerWidth >= 1024) {
                closeMenu();
            }
        });
    });
});
