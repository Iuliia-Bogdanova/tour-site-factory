// Инициализация после загрузки DOM
document.addEventListener("DOMContentLoaded", function () {
    initMobilePanel();
    initDynamicCSSProps();
    initSliderTop();
    initCounters();
    initTypedText();
    initPortfolioFilter();
    initGrowCircle();
    initClientsSlider();
    initReviewsSlider();
    initReviewZoom();
    initReviewsFilter();
    initPartnersSlider();
    initWorkshopToggle();
    initWorkshopSlider();
});

// 1. Бургер-меню
function initMobilePanel() {
    new MobilePanel({
        navbar: ".nav-bar",
    });
}

// 2. Универсальная функция для обновления любого свойства CSS в зависимости от ширины окна с любыми единицами изменения (для margin-right в .nav__icon--open)
function initDynamicCSSProps() {
    function updateDynamicProperty(
        propertyName,
        minValue,
        maxValue,
        unit,
        minWidth,
        maxWidth
    ) {
        const windowWidth = Math.min(window.innerWidth, maxWidth);
        const value =
            minValue +
            ((windowWidth - minWidth) * (maxValue - minValue)) /
                (maxWidth - minWidth);
        document.documentElement.style.setProperty(
            `--${propertyName}`,
            `${value}${unit}`
        ); // unit - единица измерения
    }

    // динамическое изменение margin-right в .nav__icon--open
    const updateMarginRight = () =>
        updateDynamicProperty("margin-right", 6, 47, "rem", 360, 1023);

    window.addEventListener("load", updateMarginRight);
    window.addEventListener("resize", updateMarginRight);
}

// 3. Swiper slider-top
function initSliderTop() {
    new Swiper(".slider-top", {
        loop: true,
        initialSlide: 0,
        slidesPerView: 1,
        spaceBetween: 15,
        centeredSlides: true,
        speed: 450,
        navigation: {
            nextEl: ".slider-top-next",
            prevEl: ".slider-top-prev",
        },
        pagination: {
            el: ".slider-top-pagination",
            clickable: true,
        },
        a11y: {
            prevSlideMessage: "Предыдущий слайд",
            nextSlideMessage: "Следующий слайд",
        },
    });
}

// 4. Анимация счетчиков Сounter .wrap-counter.stats__value
function initCounters() {
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
            { threshold: 0.9 }
        );

        statsSections.forEach((section) => observer.observe(section));
    }
}

// 5. Portfolio text typed
function initTypedText() {
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

            setTimeout(typeLoop, 60);
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
}

// 6. Фильтрация карточек портфолио
function initPortfolioFilter() {
    const tabsContainer = document.getElementById("portfolioTabs");
    if (!tabsContainer) return;

    const tabButtons = tabsContainer.querySelectorAll("button[data-category]");
    const cardContainer = document.querySelector(".portfolio-tabs__cards");
    const allCards = Array.from(
        cardContainer.querySelectorAll(".portfolio-card, .portfolio-card--tall")
    );

    let activeTab = tabsContainer.querySelector(".btn-primary-tab");

    const isActivePrimaryCurrent = () =>
        activeTab.classList.contains("btn-primary-tab") &&
        activeTab.classList.contains("btn-current");

    tabButtons.forEach((button) => {
        button.addEventListener("mouseenter", () => {
            if (button !== activeTab && !isActivePrimaryCurrent()) {
                activeTab.classList.add("btn-current");
            }
        });

        button.addEventListener("mouseleave", () => {
            if (button !== activeTab && !isActivePrimaryCurrent()) {
                activeTab.classList.remove("btn-current");
            }
        });

        button.addEventListener("click", () => {
            if (button === activeTab) return;

            // Сбросить исходно активную кнопку
            activeTab.classList.remove("btn-primary-tab", "btn-current");
            activeTab.classList.add("btn-tab");
            activeTab.setAttribute("aria-selected", "false");
            activeTab.style.pointerEvents = "auto";

            // Назначить новую активную кнопку
            button.classList.remove("btn-tab");
            button.classList.add("btn-primary-tab", "btn-current");
            button.setAttribute("aria-selected", "true");
            button.style.pointerEvents = "none";

            activeTab = button;

            // Получить категорию
            const category = button.dataset.category;

            // Перебрать карточки
            allCards.forEach((card) => {
                const cardCategories = card.dataset.category.split(" ");
                const isMatch =
                    category === "all" || cardCategories.includes(category);
                card.style.display = isMatch ? "" : "none";
            });

            // Сбросить --tall и column-count при ширине >= 768px
            if (window.innerWidth >= 768) {
                // Сбросить --tall при фильтрации
                if (category === "all") {
                    cardContainer.classList.remove("disable-tall");
                } else {
                    cardContainer.classList.add("disable-tall");
                }

                // Адаптировать column-count под кол-во видимых карточек при фильтрации
                const visibleCards = allCards.filter(
                    (card) => card.style.display !== "none"
                );

                if (visibleCards.length < 5) {
                    cardContainer.style.columnCount = 2;
                    cardContainer.classList.add("layout--narrow");
                } else {
                    cardContainer.style.columnCount = 3;
                    cardContainer.classList.remove("layout--narrow");
                }
            } else {
                // На мобилке
                cardContainer.classList.remove(
                    "disable-tall",
                    "layout--narrow"
                );
                cardContainer.style.columnCount = "";
            }
        });
    });
}

// 7. Grow black circle
function initGrowCircle() {
    const growCircle = document.querySelector(".spacer-inner__grow-circle");
    const section = document.querySelector(".section__spacer");
    const stopScaleEl = document.querySelector(".stop-scale");
    const fadeElements = document.querySelectorAll(
        ".spacer-fade-text, .spacer-fade-svg"
    );

    if (!growCircle || !section || !stopScaleEl) {
        return;
    }

    const startSize = 68;
    const triggerOffset = 300;
    let dynamicMaxScale = 100;
    let scaleFrozen = false;

    function onScroll() {
        const { top, height } = section.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const rawProgress =
            (viewportHeight - top - triggerOffset) / (viewportHeight * 2);
        const limitedProgress = Math.min(Math.max(rawProgress, 0), 1);

        let scale = 1 + limitedProgress * 100;

        const centerX = window.innerWidth / 2;
        const centerY = top + height / 2;
        const radius = (startSize * scale) / 2;
        const circleTop = centerY - radius;
        const circleBottom = centerY + radius;
        const circleLeft = centerX - radius;
        const circleRight = centerX + radius;

        const stopTop = stopScaleEl.getBoundingClientRect().top;
        const touches = circleBottom >= stopTop;

        if (touches && !scaleFrozen) {
            dynamicMaxScale = scale;
            scaleFrozen = true;
        } else if (!touches) {
            scaleFrozen = false;
        }

        scale = Math.min(scale, dynamicMaxScale);
        growCircle.style.transform = `translate(-50%, -50%) scale(${scale})`;

        // Запретить горизонтальный скролл при прокрутке
        const html = document.documentElement;
        const body = document.body;
        if (scale > 1.01) {
            html.classList.add("no-x-scroll");
            body.classList.add("no-x-scroll");
        } else {
            html.classList.remove("no-x-scroll");
            body.classList.remove("no-x-scroll");
        }

        fadeElements.forEach((el) => {
            const elRect = el.getBoundingClientRect();
            const overlaps =
                elRect.right > circleLeft &&
                elRect.left < circleRight &&
                elRect.bottom > circleTop &&
                elRect.top < circleBottom;
            el.classList.toggle("in-circle", overlaps);
        });
    }

    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                window.addEventListener("scroll", onScroll, { passive: true });
                window.addEventListener("resize", onScroll);
                onScroll();
            } else {
                window.removeEventListener("scroll", onScroll);
                window.removeEventListener("resize", onScroll);
            }
        },
        { threshold: 0 }
    );

    observer.observe(section);
}

// 8. Swiper clients-slider
function initClientsSlider() {
    new Swiper(".clients-slider", {
        loop: true,
        slidesPerView: "auto",
        spaceBetween: 50,
        navigation: {
            nextEl: ".clients-slider-next",
            prevEl: ".clients-slider-prev",
        },
        a11y: {
            prevSlideMessage: "Предыдущий слайд",
            nextSlideMessage: "Следующий слайд",
        },
    });
}

// 9. Swiper reviews-slider
function initReviewsSlider() {
    new Swiper(".reviews-slider", {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 30,
        speed: 450,
        navigation: {
            nextEl: ".reviews-slider-next",
            prevEl: ".reviews-slider-prev",
        },
        a11y: {
            prevSlideMessage: "Предыдущий слайд",
            nextSlideMessage: "Следующий слайд",
        },
    });
}

// 10. Review-img zoom
function initReviewZoom() {
    document.addEventListener("click", function (e) {
        const clickedImg = e.target.closest(".review-img");

        if (clickedImg) {
            const imgElement = clickedImg.querySelector("img");

            if (clickedImg.classList.contains("zoomed")) {
                // Снять зум кликом по зумнутой картинке
                clickedImg.classList.remove("zoomed");
                imgElement.style.transform = "scale(1)";
            } else {
                // Применить зум/transform
                clickedImg.classList.remove("zoomed");
                imgElement.style.transform = "scale(1)";

                clickedImg.classList.add("zoomed");
                imgElement.style.transform = "";
            }
        } else {
            // Убрать зум кликом вне картинки
            const zoomedEl = document.querySelector(".review-img.zoomed");
            if (zoomedEl) {
                zoomedEl.classList.remove("zoomed");
                zoomedEl.querySelector("img").style.transform = "scale(1)";
            }
        }
    });
}

// 11. Заготовка скрипта фильтрации слайдов отзывов
function initReviewsFilter() {
    const buttons = document.querySelectorAll("[data-category]");
    const slides = document.querySelectorAll(".review-slide");

    buttons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const category = btn.getAttribute("data-category");

            slides.forEach((slide) => {
                slide.style.display =
                    slide.dataset.category === category ? "flex" : "none";
            });
        });
    });
}

//12. Swiper partners-slider
function initPartnersSlider() {
    new Swiper(".partners-slider", {
        loop: true,
        slidesPerView: "auto",
        spaceBetween: 40,
        speed: 200,
        navigation: {
            nextEl: ".partners-slider-next",
            prevEl: ".partners-slider-prev",
        },
        a11y: {
            prevSlideMessage: "Предыдущий слайд",
            nextSlideMessage: "Следующий слайд",
        },
        breakpoints: {
            1024: {
                spaceBetween: 50,
            },
            1440: {
                spaceBetween: 80,
            },
        },
    });
}

// 13. Плавное разворачивание и автоскролл workshop-info
function initWorkshopToggle() {
    const buttons = document.querySelectorAll(".btn-info-toggle");

    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            button.blur(); // Убрать фокус чтобы не было залипания цвета
            const slide = button.closest(".workshop-slide");
            const textBlock = slide?.querySelector(".workshop-info");
            if (!textBlock) return;

            const collapsedHeight =
                parseFloat(getComputedStyle(textBlock).lineHeight) * 6;

            const isExpanded = textBlock.classList.contains("expanded");

            if (isExpanded) {
                // Свернуть с ограничением на высоту
                textBlock.style.maxHeight = "none"; // сброс
                textBlock.offsetHeight; // форсировать перерасчёт
                textBlock.style.maxHeight = collapsedHeight + "px";
            } else {
                // Развернуть
                textBlock.style.maxHeight = textBlock.scrollHeight + "px";
            }

            textBlock.classList.toggle("expanded");
            textBlock.classList.toggle("collapsed", isExpanded);
            button.textContent = isExpanded ? "Подробнее" : "Скрыть";

            // Автоскролл при разворачивании
            if (!isExpanded) {
                setTimeout(() => {
                    const rect = textBlock.getBoundingClientRect();
                    const isOutOfView = rect.bottom > window.innerHeight;
                    if (isOutOfView) {
                        textBlock.scrollIntoView({
                            behavior: "smooth",
                            block: "end",
                        });
                    }
                }, 300);
            }
        });
    });
}

// 14. Swiper workshop-slider
function initWorkshopSlider() {
    new Swiper(".workshops-slider", {
        loop: true,
        initialSlide: 1,
        slidesPerView: 1,
        spaceBetween: 15,
        centeredSlides: true,
        speed: 450,
        navigation: {
            nextEl: ".workshops-slider-next",
            prevEl: ".workshops-slider-prev",
        },
        pagination: {
            el: ".workshops-slider-pagination",
            clickable: true,
            dynamicBullets: true,
            dynamicMainBullets: 1,
        },
        a11y: {
            prevSlideMessage: "Предыдущий слайд",
            nextSlideMessage: "Следующий слайд",
        },
        breakpoints: {
            1024: {
                slidesPerView: 3,
                spaceBetween: 28,
                centeredSlides: false,
            },
        },
        on: {
            slideChangeTransitionStart() {
                document
                    .querySelectorAll(".workshop-info.expanded")
                    .forEach((el) => {
                        const collapsedHeight =
                            parseFloat(getComputedStyle(el).lineHeight) * 6;

                        el.classList.remove("expanded");
                        el.classList.add("collapsed");
                        el.style.maxHeight = collapsedHeight + "px";

                        const button = el
                            .closest(".workshop-slide")
                            ?.querySelector(".btn-info-toggle");
                        if (button) button.textContent = "Подробнее";
                    });
            },
        },
    });
}
