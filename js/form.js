class Form {
    constructor() {
        // DOM
        this.stationAreaTitleElt = document.getElementById("station-area__title");
        this.stationPanel = document.getElementById("info-station"),
        this.bookingPanel = document.getElementById("booking-station"),
        this.closePanelElt = document.getElementById("closed-panel");
        this.currentStationElt = document.getElementById("current-station"),
        this.lastNameInput = document.getElementById("user-last-name");
        this.firstNameInput = document.getElementById("user-first-name");
        this.deleteBtnElt = document.getElementById("delete-firm"),
        this.confirmBtnElt = document.getElementById("confirm-booking"),
        // station courante
        this.currentName,
        this.currentAddress,
        this.currentBikesNumber,
        this.currentParksNumber,
        // Canvas
        this.signatureField = new Canvas(),
        // Timer
        this.bookingTimer = new Timer()
    }
    
    manageBookingPanel() {
        this.stationAreaTitleElt.innerHTML = "réserver";
        this.bookingPanel.classList.remove("no-show");
        this.currentStationElt.innerHTML = this.currentName + " - " + this.currentAddress;
        this.lastNameInput.value = localStorage.getItem("lastName");
        this.firstNameInput.value = localStorage.getItem("firstName");

        this.signatureField.manageEvents();
        this.signatureField.preventScroll();        

        this.closeBookingPanel();

        this.deleteBtnElt.addEventListener("click", () => {
            this.resetBooking();
        });

        this.manageBookingButton();
    }

    // fermeture du panneau de réservation
    closeBookingPanel() {
        this.closePanelElt.addEventListener("click", () => {
            this.signatureField.clearCanvas();
            sessionStorage.clear();
            this.stationAreaTitleElt.innerHTML = "consulter";
            this.bookingPanel.classList.add("no-show");
            this.stationPanel.classList.remove("no-show");
            this.resetBooking();
        });
    }

    // reset une éventuelle réservation démarrée
    resetBooking() {
        this.lastNameInput.value = "";
        this.firstNameInput.value = "";
        this.deleteBtnElt.addEventListener("click", this.signatureField.clearCanvas);
    }

    // stocke les données nom et prénom dans localStorage
    setLocalStorage() {
        localStorage.setItem("lastName", this.lastNameInput.value);
        localStorage.setItem("firstName", this.firstNameInput.value);
    }

    // stocke les données nom de station, nombre de places temporaire et nombre de vélos temporaire dans sessionStorage
    setSessionStorage() {
        sessionStorage.setItem("currentStationBooking", this.currentName);
        sessionStorage.setItem("tempParksNumber", (this.currentParksNumber + 1) );
        sessionStorage.setItem("tempBikesNumber", (this.currentBikesNumber - 1) );
    }

    // gestion de la validation du formulaire
    manageBookingButton() {
        this.confirmBtnElt.addEventListener("click", () => {
            if (this.lastNameInput.value && this.firstNameInput.value && this.signatureField.hasDrawed == true) {
                this.bookingPanel.classList.add("no-show");
                this.stationAreaTitleElt.innerHTML = "consulter";
                this.stationPanel.classList.remove("no-show");
                this.setLocalStorage();
                this.setSessionStorage();
                // le timer dure 20 minutes
                this.bookingTimer.startTimer( Date.now() + 1000 * (60 * 20) );
                let confirmScroller = new Scroller("ma-reservation", 1500);
                confirmScroller.smoothScroll();
            } else {
                alert("Votre réservation est incomplète.");
            }
        });
    }
}