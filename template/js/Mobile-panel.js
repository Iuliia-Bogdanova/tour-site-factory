/**
 * MobilePanel.js
 * Version  : 2.0.0
 * License  : MIT
 * Copyright: 2020 Andrey Myagkov andreymyagkov@gmail.com
 * https://github.com/AndreyMyagkov/mobilePanel
 */
class MobilePanel {
    options = {};
    buttonsCounter = 0;

    $navbar = null;
    $overlay = null;
    $mainButton = null;

    mpTemplate =
        '<div class="mp__panel"><div class="mp__wr"><button class="mp__button mp__button-main"><span class="mp__line"></span></button></div></div><div class="mp__overlay"></div>';

    // Запрет прокрутки body
    constructor(options = {}) {
        this.options = Object.assign({}, options);

        try {
            if (!this.options.navbar) {
                throw new Error("Navbar selector not defined");
            }

            this.$navbar = document.querySelector(this.options.navbar);

            if (!this.$navbar) {
                throw new Error("Navbar not found");
            }

            document.body.classList.add("mp--init");
            document.body.insertAdjacentHTML("beforeend", this.mpTemplate);

            this.$overlay = document.querySelector(".mp__overlay");
            this.$mainButton = document.querySelector(".mp__button-main");

            this.$navbar.classList.add("mp__nav-panel", "mp__nav-panel_main");

            // Обработчик кнопки
            this.$mainButton.addEventListener(
                "click",
                (e) => {
                    const isOpen = this.$mainButton.classList.toggle("mp--on");

                    this.$navbar.classList.toggle("mp--on", isOpen);
                    this.$overlay.classList.toggle("mp--on", isOpen);

                    // Заблокировать скролл
                    document.body.classList.toggle("lock-scroll", isOpen);
                },
                true
            );

            // Обработать клик по overlay
            this.$overlay.addEventListener(
                "click",
                (e) => {
                    this.$mainButton.classList.remove("mp--on");
                    this.$navbar.classList.remove("mp--on");
                    this.$overlay.classList.remove("mp--on");

                    // Снять блокировку скролла
                    document.body.classList.remove("lock-scroll");
                },
                true
            );
        } catch (e) {
            if (e.name === "Error") {
                console.info(e);
            }
        }
    }

    // Была прокрутка body
    // constructor(options = {}) {
    //   this.options = Object.assign({}, options);
    //   try {
    //     if (!this.options.navbar) {
    //       new Error('Navbar selector not defined');
    //     }
    //     this.$navbar = document.querySelector(this.options.navbar);

    //     if (this.$navbar == null) {
    //       throw new Error('Navbar not found');

    //     } else {

    //       document.body.classList.add('mp--init');
    //       document.body.insertAdjacentHTML('beforeend', this.mpTemplate);

    //       this.$overlay = document.querySelector('.mp__overlay');
    //       this.$mainButton = document.querySelector('.mp__button-main');

    //       this.$navbar.classList.add('mp__nav-panel');
    //       this.$navbar.classList.add('mp__nav-panel_main');

    //       this.$mainButton.addEventListener('click', e => {
    //         this.$mainButton.classList.toggle('mp--on');
    //         this.$navbar.classList.toggle('mp--on');
    //         this.$overlay.classList.toggle('mp--on');
    //       }, true);

    //       this.$overlay.addEventListener('click', e => {
    //         e.target.classList.remove('mp--on');
    //         // ? цикл?
    //         //document.querySelector('.mp__button').classList.remove('mp--on');
    //         this.$mainButton.classList.toggle('mp--on');
    //         this.$navbar.classList.remove('mp--on');
    //       }, true);
    //     }

    //   } catch (e) {
    //     if (e.name === 'Error') {
    //       console.info(e);
    //     }
    //   }

    // }

    /**
     * Показывает панель
     */
    show() {
        document.querySelector(".mp__panel").style.display = "block";
        document.body.classList.add("mp--init");
    }

    /**
     * Скрывает панель
     */
    hide() {
        document.querySelector(".mp__panel").style.display = "none";
        document.body.classList.remove("mp--init");
    }

    /**
     * Create button
     * @param options - button options
     * @return {HTMLElement}
     */
    button(options) {
        if (!this.$navbar) {
            return null;
        }
        this.buttonsCounter++;
        const button = `<button id="mp_button_${
            this.buttonsCounter
        }" class="mp__button mp__button-text mp__button-${this.buttonsCounter} 
          ${options.center ? " mp__button-text--center" : ""}">${
            options.text
        }</button>`;

        document
            .querySelector(".mp__wr")
            .insertAdjacentHTML("afterbegin", button);

        if (options.navbar && document.querySelector(options.navbar)) {
            const $navBarSecond = document.querySelector(options.navbar);

            $navBarSecond.classList.add("mp__nav-panel");
            $navBarSecond.classList.add("mp__nav-panel_second");
            $navBarSecond.classList.add(
                "mp__nav-panel_second-" + this.buttonsCounter
            );

            document
                .querySelector(".mp__button-" + this.buttonsCounter)
                .addEventListener(
                    "click",
                    (e) => {
                        e.target.classList.toggle("mp--on");
                        $navBarSecond.classList.toggle("mp--on");
                        this.$overlay.classList.toggle("mp--on");
                        // закрыть главную панель
                    },
                    true
                );

            this.$overlay.addEventListener(
                "click",
                () => {
                    $navBarSecond.classList.remove("mp--on");
                },
                true
            );
        }

        return document.getElementById("mp_button_" + this.buttonsCounter);
    }

    /**
     * Add notification to button
     * @param options
     */
    notification(options) {
        if (!this.$navbar) {
            return null;
        }
        const $button = options.button.querySelector(".mp__notification");
        if ($button !== null) {
            $button.innerHTML = options.value;
        } else {
            options.button.insertAdjacentHTML(
                "afterbegin",
                '<div class="mp__notification">' + options.value + "</div>"
            );
        }
    }
}
