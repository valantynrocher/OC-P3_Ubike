
/*
==========================================================================
GESTION DU MENU PRINCIPAL
==========================================================================
*/

let mainMenu = new Menu();

/*
==========================================================================
GESTION D'ÉVÉNEMENTS
==========================================================================
*/

window.addEventListener("load", () => {
    sessionStorage.clear();
})

document.getElementById("home-link").addEventListener("click", (e) => {
    e.preventDefault();
    let topScroller = new Scroller("top", 1500);
    topScroller.smoothScroll();
})

document.getElementById("presentation-link").addEventListener("click", (e) => {
    e.preventDefault();
    let presentationScroller = new Scroller("presentation", 1500);
    presentationScroller.smoothScroll();
})

document.getElementById("booking-link").addEventListener("click", (e) => {
    e.preventDefault();
    let bookingScroller = new Scroller("reserver", 1500);
    bookingScroller.smoothScroll();
})

document.getElementById("confirm-link").addEventListener("click", (e) => {
    e.preventDefault();
    let confirmScroll = new Scroller("ma-reservation", 1500);
    confirmScroll.smoothScroll();
})

document.getElementById("scroll-down").addEventListener("click", () => {
    let headerScroller = new Scroller("presentation", 1500);
    headerScroller.smoothScroll();
});

document.getElementById("howToBook").addEventListener("click", () => {
    let howToBookScroller = new Scroller("presentation", 1500);
    howToBookScroller.smoothScroll();
});

document.getElementById("seeTheMap").addEventListener("click", () => {
    let seeTheMapScroller = new Scroller("reserver", 1500);
    seeTheMapScroller.smoothScroll();
});

document.getElementById("signUp").addEventListener("click", () => {
    alert("Désolé mais vous ne pouvez pas encore vous inscrire sur notre service.");
});

document.getElementById("signIn").addEventListener("click", () => {
    alert("Désolé mais vous ne pouvez pas encore vous connecter à notre service.");
});


/* =========================================================================
CREATION DU SLIDER
==========================================================================*/

let mobileCarousel = new Slider(document.querySelector("#slider"), {
    slidesVisible: 2,
    slidesToScroll: 2,
    loop: true,
    pagination: true,
    navigation: false,
})

/*
==========================================================================
CREATION DE LA CARTE
==========================================================================
*/

let bikeMap = new Map(
    // id
    "mapStations",
    // position
    [47.2175, -1.5535],
    // zoom
    13,
    // layer
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    // style
    "mapbox/light-v10",
    // accessToken
    "pk.eyJ1IjoidmFsYW50eW4iLCJhIjoiY2szcmhvbmNjMGJqcDNpbW5iNGswdDZrciJ9.62FYXS-2mbnwjKb0UoN8Qw",
    // attribution
    'Données &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Rendu © <a href="https://www.mapbox.com/">Mapbox</a>',
    // decauxApi
    "https://api.jcdecaux.com/vls/v3/stations?contract=nantes&apiKey=031ee54441e80f27f7b31e46ba6d66c537044c40"
    );

bikeMap.showMap();