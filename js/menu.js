class Menu {
    constructor() {
        this.toggleMenu = document.getElementById("toggle-menu"),
        this.mobileMenuLink = document.getElementById("mobileMenuLink"),
        this.mobileMenuIcon = document.getElementById("mobileMenuIcon"),
        this.navigationMenu = document.getElementById("navigation-menu"),

        this.isMobile = false,

        this.menuIsOpen = false,

        this.manageEvents(),

        this.onWindowResize(),
        window.addEventListener("resize", this.onWindowResize.bind(this))
    }

    onWindowResize() {
        if (window.innerWidth < 768) {
            this.toggleMenu.classList.remove("no-show");
            this.navigationMenu.classList.replace("desktop-navigation", "mobile-navigation");
        } else if (window.innerWidth >= 768) {
            this.toggleMenu.classList.add("no-show");
            this.navigationMenu.classList.replace("mobile-navigation", "desktop-navigation");
        }
    }

    manageEvents() {
        this.mobileMenuLink.addEventListener("click", (e) => {
            e.preventDefault();
            if (this.menuIsOpen === false) {
                // quand le menu s'ouvre
                this.mobileMenuIcon.classList.replace("fa-bars", "fa-times");
                this.navigationMenu.style.left = "0";
                this.mobileMenuLink.style.backgroundColor = "#FCD434";
                this.menuIsOpen = true;

            } else if (this.menuIsOpen === true) {
                // quand le menu se ferme
                this.mobileMenuIcon.classList.replace("fa-times", "fa-bars");
                this.navigationMenu.style.left = "-120%";
                this.mobileMenuLink.style.backgroundColor = "#FFF";
                this.menuIsOpen = false;
            }
        })
    }
}