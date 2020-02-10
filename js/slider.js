class Slider {
   /**
    * This callback type is called `requestCallback` and is displayed as a global symbol.
    *
    * @callback moveCallbacks
    * @param {number} index
    * @param {string} responseMessage
    */

   /**
    * 
    * @param {HTMLElement} slider div contenant le slider
    * @param {Object} options
    * @param {Object} [options.slidesToScroll=1] Nombre d'éléments à faire défiler
    * @param {Object} [options.slidesVisible=1] Nombre d'éléments visibles dans un slide
    * @param {Boolean} [options.loop=false] Doit-on boucler à la fin du slider
    * @param {Boolean} [options.pagination=false] Doit-on créer la pagination
    * @param {Boolean} [options.navigation=true] 
    */

    constructor(slider, options = {}) {
        this.slider = slider,
        // permet de définir les options par défaut : Object.assign va copier les options
        // passées en deuxième paramètre dans le paramètre cible (objet vide)
        this.options = Object.assign( {}, {
            slidesToScroll: 1,
            slidesVisible: 1,
            loop: false,
            pagination: false,
            navigation: true,
        }, options)

        // récupérer uniquement les enfant de notre élément créés en html
        // children retourne les éléments HTML contrairement à childNodes qui retourne tous les noeuds (dont les noeuds de texte)
        let children = [].slice.call(slider.children)

        this.isPlaying = true

        this.isMobile = false

        this.currentItem = 0

        this.pauseButton = document.getElementById("pause__button")
        this.playButton = document.getElementById("play__button")
        
        this.root = this.createDivWithClass("slider")
        this.container = this.createDivWithClass("slider__container")
        this.root.appendChild(this.container)
        this.slider.appendChild(this.root)

        this.moveCallbacks = []

        this.items = children.map( (child) => {
            let item = this.createDivWithClass("slider__item")
            item.appendChild(child)
            
            return item
        })

        this.items.forEach(item => this.container.appendChild(item))

        this.setStyle()
        this.createNavigation()

        if (this.options.pagination === true) {
            this.createPagination()
        }
        
        this.moveCallbacks.forEach(cb => cb(this.currentItem))

        this.onWindowResize()
        window.addEventListener("resize", this.onWindowResize.bind(this))
    }

    /**
     * Applique les bonnes dimensions aux éléments du slider
     */

    setStyle () {
        let ratio = this.items.length / this.slidesVisible;
        this.container.style.width = (ratio * 100) + "%";
        this.items.forEach( item => item.style.width = ((100 / this.slidesVisible) / ratio) + "%");
    }

    /**
     * Créé les flèches de navigation
     */

    createNavigation () {
        this.prevButton = this.createDivWithClass("slider__prev");
        this.nextButton = this.createDivWithClass("slider__next");
        this.root.appendChild(this.prevButton);
        this.root.appendChild(this.nextButton);

        this.manageNavigation();
    }

    /**
     * Gère la navigation générale du slider
     */
    manageNavigation() {
        this.mouseNavigation();
        this.keyboardNavigation();
        this.autoPlayNavigation();
        this.pauseButtonNavigation();
        this.playButtonNavigation();
        
        if(this.options.loop === true) {
            return;
        }

        this.onMove(index => {
            if (index === 0) {
                this.prevButton.classList.add("slider__prev--hidden");
            } else {
                this.prevButton.classList.remove("slider__prev--hidden");
            }

            if (this.items[this.currentItem + this.slidesVisible] === undefined) {
                this.nextButton.classList.add("slider__next--hidden");
            } else {
                this.nextButton.classList.remove("slider__next--hidden");
            }
        })
    }

    mouseNavigation() {
        this.nextButton.addEventListener("click", this.next.bind(this));
        this.prevButton.addEventListener("click", this.prev.bind(this));
    }

    keyboardNavigation() {
        document.addEventListener("keydown", (e) => {
            let keyCode = e.keyCode;
            switch(keyCode) {
                case 39:
                    this.next();
                    console.log("L'utilisateur appuie sur la touche fleche vers la droite");
                break;
                case 37:
                    this.prev();
                    console.log("L'utilisateur appuie sur la touche fleche vers la gauche");
                break;
            }
        })
    }

    autoPlayNavigation() {
        this.playButton.classList.add("play__button--active");
        this.interval = setInterval(this.next.bind(this), 5000);
    }

    pauseButtonNavigation() {
        if (this.isPlaying) {
            this.pauseButton.addEventListener("click", () => {
                this.pauseButton.classList.add("pause__button--active");
                this.playButton.classList.remove("play__button--active");

                clearInterval(this.interval);

                this.isPlaying = false;
            })
        } else {return}
    }

    playButtonNavigation() {
        this.playButton.addEventListener("click", () => {
            this.pauseButton.classList.remove("pause__button--active");
            this.playButton.classList.add("play__button--active");

            clearInterval(this.interval);
            this.interval = setInterval(this.next.bind(this), 5000);

            this.isPlaying = true;
        })
    }

    next() {
        this.gotoItem(this.currentItem + this.slidesToScroll);
    }

    prev() {
        this.gotoItem(this.currentItem - this.slidesToScroll);
    }

    createPagination() {
        let pagination = document.getElementById("slider__pagination");
        let buttons = [];
        for (let i = 0; i < this.items.length; i = i + this.slidesToScroll) {
            let button = this.createDivWithClass("slider__pagination__button");
            button.addEventListener("click", () => this.gotoItem(i));
            pagination.appendChild(button);
            buttons.push(button);
        }
        this.onMove(index => {
            let activeButton = buttons[Math.floor(index / this.slidesToScroll)];
            if (activeButton) {
                buttons.forEach(button => button.classList.remove("slider__pagination__button--active"));
                activeButton.classList.add("slider__pagination__button--active");
            }
        })
    }

    /**
     * Déplace le slider vers l'élément ciblé
     * @param {number} index 
     * @param {Boolean} [animation = true]
     */
    gotoItem (index, animation = true) {
        if (index < 0) {
            index = this.items.length - this.slidesVisible;
        } else if (index >= this.items.length || (this.items[this.currentItem + this.slidesVisible] === undefined && index > this.currentItem)) {
            index = 0;
        }
        // définit la distance de décalage négatif
        let translateX = index * -100 / this.items.length;
        if (animation === false) {
            this.container.style.transition = "none";
        }
        this.container.style.transform = 'translate3d(' + translateX + '%, 0, 0)';
        if (animation === false) {
            this.container.style.transition = "";
        }
        this.currentItem = index;
        this.moveCallbacks.forEach(cb => cb(index));
    }

    /**
     * 
     * @param {moveCallbacks} cb 
     */
    onMove(cb) {
        this.moveCallbacks.push(cb);
    }

    /**
     * Adapte le slider lorsque la largeur de la fenetre est réduite à - de 768px
     */
    onWindowResize() {
        let mobile = window.innerWidth < 768;
        if (mobile !== this.isMobile) {
            this.isMobile = mobile;
            this.setStyle();
            this.moveCallbacks.forEach(cb => cb(this.currentItem));
        }
    }
 
    /**
     * Créé une div avec une class donnée
     * @param {string} className
     * @returns {HTMLElement}
     */
    createDivWithClass(className) {
        let div = document.createElement("div");
        div.setAttribute("class", className);
        return div;
        
    }

    /**
     * @returns {number}
     */
    get slidesVisible() {
        return this.isMobile ? 1 : this.options.slidesVisible;
    }

    get slidesToScroll() {
        return this.isMobile ? 1 : this.options.slidesToScroll;
    }
}