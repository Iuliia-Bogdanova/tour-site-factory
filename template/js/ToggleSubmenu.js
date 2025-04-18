const parentItems = document.querySelectorAll(".nav__item--parent");

parentItems.forEach((parent) => {
    const link = parent.querySelector(".nav__link");
    const sublist = parent.querySelector(".nav__sublist");

    if (!sublist) return; // Пропустить элементы без подменю

    let isDesktop = window.innerWidth >= 1024;

    function toggleSubmenu() {
        const isOpen = sublist.classList.contains("open");
        const icon = link.querySelector(".first-level-icon");

        sublist.classList.toggle("open", !isOpen);
        link.classList.toggle("active", !isOpen);
        parent.classList.toggle("active", !isOpen);

        if (icon) {
            icon.classList.toggle("active", !isOpen);
        }
    }

    function closeSubmenu() {
        sublist.classList.remove("open");
        link.classList.remove("active");
        parent.classList.remove("active");

        const icon = link.querySelector(".first-level-icon");
        if (icon) {
            icon.classList.remove("active");
        }
    }

    function openSubmenu() {
        sublist.classList.add("open");
        link.classList.add("active");
        parent.classList.add("active");

        const icon = link.querySelector(".first-level-icon");
        if (icon) {
            icon.classList.add("active");
        }
    }

    // Обработать клики на 2 уровне если есть 3 уровень
    sublist.querySelectorAll(".nav__item--child").forEach((childItem) => {
        const childLink = childItem.querySelector(".nav__link--child");
        const nestedSublist = childItem.querySelector(".nav__sublist--nested");
        const openIcon = childItem.querySelector(".icon-open");
        const closeIcon = childItem.querySelector(".icon-close");

        if (!nestedSublist || !openIcon || !closeIcon) return; // Пропустить элементы без иконок

        function toggleNestedSubmenu() {
            const isOpen = nestedSublist.classList.contains("open");

            // НЕ сбрасывать активные классы у других пунктов 2 уровня
            nestedSublist.classList.toggle("open", !isOpen);
            childLink.classList.toggle("active", !isOpen);
            childItem.classList.toggle("active", !isOpen);
            openIcon.classList.toggle("hidden", !isOpen);
            closeIcon.classList.toggle("hidden", isOpen);
        }

        // Закрыть вложенные подменю при закрытии родителя на десктопе
        function closeNestedSubmenu() {
            nestedSublist.classList.remove("open");
            childLink.classList.remove("active");
            childItem.classList.remove("active");
            openIcon.classList.remove("hidden");
            closeIcon.classList.add("hidden");
        }

        // Обработать клик на мобилке
        childLink.addEventListener("click", (e) => {
            if (!isDesktop && nestedSublist) {
                e.preventDefault();
                toggleNestedSubmenu();
            }
        });

        // Обработать ховер на десктопе
        if (isDesktop && nestedSublist) {
            childItem.addEventListener("mouseenter", toggleNestedSubmenu);
            childItem.addEventListener("mouseleave", () => {
                if (nestedSublist.classList.contains("open")) {
                    closeNestedSubmenu();
                }
            });
        }
    });

    // Обработать клики на мобилке для 1 уровня
    link.addEventListener("click", (e) => {
        if (!isDesktop) {
            e.preventDefault();
            toggleSubmenu();
        }
    });

    // Обработать ховер на десктопе для 1 уровня
    if (isDesktop) {
        parent.addEventListener("mouseenter", openSubmenu);
        parent.addEventListener("mouseleave", closeSubmenu);
    }
});
