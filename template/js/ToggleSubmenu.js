const parentItems = document.querySelectorAll(".nav__item--parent");

parentItems.forEach((parent) => {
    const link = parent.querySelector(".nav__link");
    const sublist = parent.querySelector(".nav__sublist");

    const isDesktop = window.innerWidth >= 1024;

    function toggleMenu() {
        const isOpen = sublist.classList.contains("open");
        sublist.classList.toggle("open", !isOpen);
        link.classList.toggle("active", !isOpen);

        parent.classList.toggle("active", !isOpen);
    }

    function closeMenu() {
        sublist.classList.remove("open");
        link.classList.remove("active");

        parent.classList.remove("active");
    }

    function openMenu() {
        sublist.classList.add("open");
        link.classList.add("active");
    }

    // Клик на псевдоэлемент для открытия/закрытия (на мобилке)
    link.addEventListener("click", function (event) {
        if (!isDesktop) {
            event.preventDefault();
            toggleMenu();
        }
    });

    // Наведение на десктопе
    if (isDesktop) {
        parent.addEventListener("mouseenter", openMenu);
        parent.addEventListener("mouseleave", closeMenu);
    }
});
