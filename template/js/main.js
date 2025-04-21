// 1. burger-меню
const mp = new MobilePanel({
    navbar: ".nav-bar",
});

// 2. Универсальная функция для обновления любого свойства CSS в зависимости от ширины окна с любыми единицами изменения
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

// 3. Swiper слайдер
document.addEventListener("DOMContentLoaded", function () {
    const swiper = new Swiper(".swiper-container", {
        loop: true,
        initialSlide: 0,
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
            // dynamicBullets: true,
            // dynamicMainBullets: 1,
            // отключить активную точку + соседние, включить все
        },
        a11y: {
            prevSlideMessage: "Предыдущий слайд",
            nextSlideMessage: "Следующий слайд",
        },
    });
});

// 4. Анимация счетчика Сounter .wrap-counter.stats__value
function animateCounter(element, endValue, duration) {
    let current = 0;
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
// Запустить анимацию внутри блока
function startCountingInBlock(container) {
    const counters = container.querySelectorAll(".stats__value");

    counters.forEach((counter) => {
        const endValue = parseInt(counter.textContent, 10);
        counter.textContent = "0";
        animateCounter(counter, endValue, 1500);
    });
}

const statsSections = document.querySelectorAll(".wrap-counter");

if (statsSections.length > 0) {
    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    startCountingInBlock(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.9,
        }
    );

    statsSections.forEach((section) => {
        observer.observe(section);
    });
}

// 5. Portfolio text typed
document.addEventListener("DOMContentLoaded", () => {
    const typedItems = document.querySelectorAll(".typed-item");
    const texts = Array.from(typedItems).map((item) => item.textContent);

    let currentIndex = 0;
    let charIndex = 0;
    let direction = "forward";

    // Очистить текст, скрыть все
    typedItems.forEach((item) => {
        item.textContent = "";
        item.classList.remove("visible");
    });

    function typeLoop() {
        const currentItem = typedItems[currentIndex];
        const currentText = texts[currentIndex];

        if (charIndex === 0 && direction === "forward") {
            // Добавить fade-in в начале слова
            currentItem.classList.add("visible");
        }

        if (direction === "forward") {
            currentItem.textContent = currentText.slice(0, charIndex + 1);
            charIndex++;

            if (charIndex === currentText.length) {
                direction = "backward";
                setTimeout(typeLoop, 1400);
                return;
            }

            setTimeout(typeLoop, 60); // скорость тайпинга
        } else if (direction === "backward") {
            currentItem.textContent = currentText.slice(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                currentItem.classList.remove("visible");
                currentIndex = (currentIndex + 1) % typedItems.length;
                direction = "forward";
                setTimeout(typeLoop, 400);
                return;
            }

            setTimeout(typeLoop, 30); // скорость delete
        }
    }

    typeLoop();
});

// 6.1 Portfolio-tabs switchers на десктопе ховер и клик одинаковые, через .btn-active
// document.addEventListener("DOMContentLoaded", function () {
//     const tabsContainer = document.getElementById("portfolioTabs");
//     const tabButtons = tabsContainer.querySelectorAll("button[data-category]");
//     let activeTab = tabsContainer.querySelector(".btn-primary-tab");

//     tabButtons.forEach((button) => {
//         // Ховер — временно добавить стиль активной к текущей
//         button.addEventListener("mouseenter", () => {
//             if (button !== activeTab) {
//                 activeTab.classList.add("btn-tab");
//             }
//         });

//         button.addEventListener("mouseleave", () => {
//             if (button !== activeTab) {
//                 activeTab.classList.remove("btn-tab");
//             }
//         });

//         // Клик — переключить активную кнопку
//         button.addEventListener("click", () => {
//             if (button !== activeTab) {
//                 // Удалить стили у текущей активной
//                 activeTab.classList.remove("btn-primary-tab", "btn-active");
//                 activeTab.classList.add("btn-tab");
//                 activeTab.removeAttribute("aria-selected");
//                 activeTab.style.pointerEvents = "auto";

//                 // Добавить активные стили новой кнопке
//                 button.classList.remove("btn-tab");
//                 button.classList.add("btn-primary-tab", "btn-active");
//                 button.setAttribute("aria-selected", "true");
//                 button.style.pointerEvents = "none";

//                 activeTab = button;
//             }
//         });
//     });
// });

// 6.2 Portfolio-tabs switchers на десктопе ховер и клик разные, через .btn-current
document.addEventListener("DOMContentLoaded", () => {
    const tabsContainer = document.getElementById("portfolioTabs");
    const tabButtons = tabsContainer.querySelectorAll("button[data-category]");

    let activeTab = tabsContainer.querySelector(".btn-primary-tab");

    tabButtons.forEach((button) => {
        button.addEventListener("mouseenter", () => {
            if (button !== activeTab) activeTab.classList.add("btn-current");
        });

        button.addEventListener("mouseleave", () => {
            if (button !== activeTab) activeTab.classList.remove("btn-current");
        });

        button.addEventListener("click", () => {
            if (button === activeTab) return;

            // Сбросить старую активную
            activeTab.classList.remove("btn-primary-tab", "btn-current");
            activeTab.classList.add("btn-tab");
            activeTab.setAttribute("aria-selected", "false");
            activeTab.style.pointerEvents = "auto";

            // Назначить новую активную
            button.classList.remove("btn-tab");
            button.classList.add("btn-primary-tab", "btn-current");
            button.setAttribute("aria-selected", "true");
            button.style.pointerEvents = "none";

            activeTab = button;
        });
    });
});
