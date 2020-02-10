class Station {
    constructor() {
        // DOM
        this.stationPanel = document.getElementById("info-station"),
        this.nameElt = document.getElementById("name"),
        this.addressElt = document.getElementById("address"),
        this.statutElt = document.getElementById("statut"),
        this.parksElt = document.getElementById("parks"),
        this.bikesElt = document.getElementById("bikes"),
        this.bookingBtnElt = document.getElementById("booking-btn"),
        this.bookingPanel = document.getElementById("booking-station"),
        // MARKER
        this.marker,
        // STATION
        this.name,
        this.address,
        this.statut,
        this.latitude,
        this.longitude,
        this.parks,
        this.bikes,
        // chaque station déclenche une instance de la class FORM
        this.bookingForm = new Form()
    }

    createIcons() {
        const MyIcon = L.Icon.extend({
            options: {
                iconSize: [38, 95],
                iconAnchor: [22, 94],
            }
        });
        // instanciation de l'objet MyIcon pour créer 3 icônes personnalisées
        this.bikesIcon = new MyIcon({iconUrl: "./images/icons/marker-bikes.svg"});
        this.noBikeIcon = new MyIcon({iconUrl: "./images/icons/marker-no-bike.svg"});
        this.closedIcon = new MyIcon({iconUrl: "./images/icons/marker-closed.svg"});
    }

    createMarker(leafletMap) {
        this.createIcons();
        this.marker = L.marker(
            [this.latitude, this.longitude], 
            {icon: this.statut === "OPEN" ? this.bikesIcon : this.closedIcon,
            title: `${this.name} - ${this.bikes} vélo(s) - ${this.parks} place(s)`}
            ).addTo(leafletMap);
        this.manageStationEvent();
    }

    manageStationEvent() {
        // Gestion du click sur une station
        this.marker.addEventListener("click", e => {
            this.bookingForm.stationAreaTitleElt.innerHTML = "consulter";
            this.stationPanel.classList.remove("no-show");
            this.bookingPanel.classList.add("no-show");
            this.bookingForm.resetBooking();
            this.bookingForm.signatureField.clearCanvas();
            this.showMainInfos();

            // Gestion du statut de la station
            if (this.statut === "OPEN") {
                this.stationIsOpen();
                if (this.bikes > 0) {
                    this.thereIsBikes();
                } else {
                    this.thereIsNoBikes();
                }
            } else if (this.statut === "CLOSED") {
                this.stationIsClosed();
            }

        });
    }

    // affichage des détails de station par défaut
    showMainInfos() {
        this.nameElt.innerHTML = this.name;
        this.addressElt.innerHTML = this.address;
    }

    stationIsOpen() {
        // modifier la case Statut
        this.statutElt.textContent = "Station ouverte";
        this.statutElt.style.backgroundColor = "green";
        this.parksElt.textContent = this.parks;
        this.parksElt.style.backgroundColor = "#047F8C";
    }

    thereIsBikes() {
        this.bikesElt.classList.remove("no-show");
        this.parksElt.classList.remove("no-show");
        this.bikesElt.style.backgroundColor = "#05A6A6";
        this.bookingBtnElt.classList.remove("no-show");
        this.manageBookingEvent();
        this.bikesElt.textContent = this.bikes;
    }

    manageBookingEvent() {
        // Gestion du clic sur le bouton "Je réserve"
        this.bookingBtnElt.addEventListener("click", () => {
            if (sessionStorage.length > 0) {
                let confirmNewBooking = confirm("Une réservation est déjà en cours. Cliquez sur OK pour effectuer une nouvelle réservation et écraser la première. Cliquez sur annuler pour conserver votre réservation en cours.");
                if (confirmNewBooking == true) {
                    this.startNewBooking();
                } else {};
            } else {
                this.startNewBooking();
            }
        });
    }

    startNewBooking() {
        // masque le panneau station
        this.stationPanel.classList.add("no-show");

        sessionStorage.clear();

        // réinitialise le message "ma réservation"
        this.bookingForm.bookingTimer.stopTimer();
        
        // réccupération des informations de la stations en cours pour la réservation
        this.bookingForm.currentName = this.name;
        this.bookingForm.currentAddress = this.address;
        this.bookingForm.currentBikesNumber = this.bikes;
        this.bookingForm.currentParksNumber = this.parks;

        // renvoi vers l'objet Forms pour permettre la réservation
        this.bookingForm.manageBookingPanel();        
    }

    thereIsNoBikes() {
        this.bikesElt.textContent = this.bikes;
        this.bikesElt.style.backgroundColor = "red";
        this.bookingBtnElt.classList.add("no-show");
    }

    stationIsClosed(){
        this.bikesElt.classList.add("no-show");
        this.parksElt.classList.add("no-show");
        this.bookingBtnElt.classList.add("no-show");
        // modifier la case Statut
        this.statutElt.textContent = "Station fermée";
        this.statutElt.style.backgroundColor = "red";
    }
}