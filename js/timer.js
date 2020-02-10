class Timer {
    constructor() {
        this.time,
        this.endTime,
        this.interval,
        this.min,
        this.sec,
        // informations de reservation
        this.userLastName,
        this.userFirstName,
        this.stationBooking,
        // informations temporaires de la station
        this.tempParksNumber,
        this.tempBikesNumber,
        // DOM
        this.parksElt = document.getElementById("parks"),
        this.bikesElt = document.getElementById("bikes"),
        this.initialMessageElt = document.getElementById("initialMessage"),
        this.timerMessageElt = document.getElementById("timerMessage"),
        this.timerUserElt = document.getElementById("timerUser"),
        this.timerStationElt = document.getElementById("timerStation"),
        this.timerMinutesElt = document.getElementById("timerMinutes"),
        this.timerSecondsElt = document.getElementById("timerSeconds")
    }

    startTimer(date) {
        this.endTime = date;
        sessionStorage.setItem("endTime", this.endTime);
        this.updateTimer();
        this.interval = setInterval( e => this.countdown(), 1000);

        this.tempAvailability();
        this.setConfirmMessage();
    }

    updateTimer() {
        this.time = Math.round( (this.endTime - Date.now() ) / 1000 );
        this.min = Math.floor(this.time/60);
        this.sec = this.time - this.min * 60;
        if (this.min < 10) this.min = "0" + this.min;
        if (this.sec < 10) this.sec = "0" + this.sec;

        this.timerMinutesElt.innerHTML = this.min;
        this.timerSecondsElt.innerHTML = this.sec;
    }

    tempAvailability() {
        this.tempParksNumber = Number(sessionStorage.getItem("tempParksNumber"));
        this.tempBikesNumber = Number(sessionStorage.getItem("tempBikesNumber"));
        this.parksElt.innerHTML = this.tempParksNumber;
        this.bikesElt.innerHTML = this.tempBikesNumber;

        // si le nombre de vélo passe à 0
        if (this.tempBikesNumber <= 0) {
            this.bikesElt.style.backgroundColor = "red";
            document.getElementById("booking-btn").classList.add("no-show");
        }
    }

    setConfirmMessage() {
        // récuperation des données du WebStorage
        this.userLastName = localStorage.getItem("lastName");
        this.userFirstName = localStorage.getItem("firstName");
        this.stationBooking = sessionStorage.getItem("currentStationBooking");

        // ajoute les informations de réservations au message
        this.timerUserElt.innerHTML = this.userFirstName + " " + this.userLastName;
        this.timerStationElt.innerHTML = "";
        this.timerStationElt.innerHTML = this.stationBooking;

        this.initialMessageElt.classList.add("no-show");
        
        this.timerMessageElt.classList.remove("no-show");
    }

    countdown() {
        this.updateTimer();
        if (this.time <= 0) this.stopTimer();
    }

    // gérer l'expiration de la réservation
    stopTimer() {
        clearInterval(this.interval);
        sessionStorage.clear();
        this.unsetConfirmMessage();
        if (this.tempParksNumber != null && this.tempBikesNumber != null) {
            this.resetAvailability();
        }
    }

    unsetConfirmMessage() {
        this.initialMessageElt.classList.remove("no-show");
        this.timerMessageElt.classList.add("no-show");
    }

    resetAvailability() {
        this.parksElt.innerHTML = this.tempParksNumber - 1;
        this.bikesElt.innerHTML = this.tempBikesNumber + 1;
    }
}