class Map {
    /**
     * 
     * @param {HTMLElement} id : contenant html de la map
     * @param {Array} position : lattitude et longitude pour l'affichage de la carte
     * @param {Number} zoom 
     * @param {String} layer : calque de rendu
     * @param {String} style : style de carte personnalisé Mapbox
     * @param {String} accessToken : clé d'accès du service Mapbox
     * @param {String} attribution 
     * @param {String} decauxApi 
     */
    constructor(id, position, zoom, layer, style, accessToken, attribution, decauxApi) {
        // DOM
        this.mapContainer = document.getElementById(id),
        // MAP
        this.position = position,
        this.zoom = zoom,
        this.layer = layer,
        this.style = style,
        this.accessToken = accessToken,
        this.attribution = attribution,
        // DATAS
        this.decauxApi = decauxApi
    }

    showMap() {
        // Initialisation de la carte
        this.leafletMap = L.map(this.mapContainer).setView(this.position, this.zoom);

        // Ajout d'un rendu de carte via MapBox
        L.tileLayer(this.layer, {
            attribution: this.attribution,
            minZoom: this.zoom,
            id: this.style,
            accessToken: this.accessToken
        }).addTo(this.leafletMap);

        // récupération des données de station
        this.getDatas();
    }

    getDatas() {
        ajaxGet(this.decauxApi, reponse => {
            // conversion de JSON vers array JS
            this.listStations = JSON.parse(reponse);
            // passage sur chaque station
            for (let i = 0; i < this.listStations.length ; i++) {
                // nouvelle instance de Station pour chaque objet du tableau
                let station = new Station();

                // stockage des détails nécessaires
                station.name = this.listStations[i].name.replace(new RegExp("[^(\s + a-zA-Z + \s)]", "g"), '');
                station.address = this.listStations[i].address;
                station.statut = this.listStations[i].status;
                station.latitude = this.listStations[i].position.latitude;
                station.longitude = this.listStations[i].position.longitude;
                station.parks = this.listStations[i].totalStands.availabilities.stands;
                station.bikes = this.listStations[i].totalStands.availabilities.bikes;
                
                station.createMarker(this.leafletMap);
            }
        });
    }
}