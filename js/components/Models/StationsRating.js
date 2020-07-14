function StationsRatingModel(location, qtyChargingEvents, date) {
    this.location = location;
    this.qtyChargingEvents = qtyChargingEvents;
    if(typeof date == "string") {
        this.date = DateTimeParser.FromString(date);
    }
    else
        this.date = date;
}

Object.defineProperty(StationsRatingModel.prototype, "GetLocation", {
    get() {
        return this.location;
    }
});

Object.defineProperty(StationsRatingModel.prototype, "GetChargingEventsQty", {
    get() {
        return this.qtyChargingEvents;
    }
});

let StationsRating = (function () {
    function StationsRating() {
        this.objs = [
            new StationsRatingModel(new Location("Latvia", "Riga", "WX8C+32 Skulte, Mārupes novads", [56.915246, 23.970103]),3321, "15.06.2020"),
            new StationsRatingModel(new Location("Latvia", "Riga", "Jurmalas pilseta", [56.968803, 23.890943]),32323, "14.06.2020"),
            new StationsRatingModel(new Location("Latvia", "Riga", "Daugavgrīva", [57.012477,24.036142]),223, "13.06.2020"),
            new StationsRatingModel(new Location("Latvia", "Riga", "Mangaļsala", [57.067269, 24.073939]),232, "12.05.2020"),
            new StationsRatingModel(new Location("Latvia", "Riga", "Piedzīvojumu parks", [57.012841, 24.144681]),2323, "11.06.2020"),
            new StationsRatingModel(new Location("Latvia", "Riga", "Ķekava Parish", [56.886828, 24.132542]),232, "10.06.2020"),
            new StationsRatingModel(new Location("Latvia", "Riga", "Сигулда, Siguldas pilsēta", [57.1414,24.8539373]),22, "10.06.2020"),
            new StationsRatingModel(new Location("Latvia", "Riga", "Tomes pagasts", [56.7464864,24.4994616]),44, "10.06.2020"),
            new StationsRatingModel(new Location("Latvia", "Riga", "Sērenes pagasts", [56.5709422,25.0095623]),45, "10.06.2020"),
            new StationsRatingModel(new Location("Latvia", "Riga", "Auru pagasts", [56.5849567,23.0957571]),656, "10.06.2020"),
            new StationsRatingModel(new Location("Latvia", "Riga", "Kuldīgas novads", [56.9359606,21.6907556]),2534, "10.06.2020"),
            new StationsRatingModel(new Location("Latvia", "Riga", "Kaives pagasts", [57.0371482,25.4486448]),34, "10.06.2020"),
            new StationsRatingModel(new Location("Latvia", "Riga", "Ropažu novads", [56.9782438,24.4534237]),7567, "10.06.2020")
            // new StationsRatingModel(new Location("Latvia", "Valmiera", "Elinos 34-6", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/"),75171, "10.04.2020"),
            // new StationsRatingModel(new Location("Estonia", "Tallin", "Elinos 34-8", "https://www.google.ru/maps/place/@59.369593,24.739754,9z/"),75173, "02.06.2020"),
            // new StationsRatingModel(new Location("Finland", "Helsinki", "Elinos 33-8", "https://www.google.ru/maps/place/@60.23163,24.920331,9z/"),75173, "01.06.2020"),
            // new StationsRatingModel(new Location("Ukraine", "Kiev", "Pushkin street 34-11", "https://www.google.ru/maps/@50.445262,30.531903,11.67z"),7576, "10.04.2020"),
            // new StationsRatingModel(new Location("Poland", "Warsaw", "Elinos 34-10", "https://www.google.ru/maps/place/@52.214339,20.899708,9z/"),75175, "26.05.2020"),
            // new StationsRatingModel(new Location("Netherlands", "Amsterdam", "Elinos 34-10", "https://www.google.ru/maps/place/@52.335339,4.946472,9z/"),75175, "26.05.2020"),
            // new StationsRatingModel(new Location("France", "Paris", "Elinos 34-10", "https://www.google.ru/maps/place/@48.84592,2.333719,9z/"),75175, "26.05.2020"),
            // new StationsRatingModel(new Location("Germany", "Berlin", "Elinos 34-10", "https://www.google.ru/maps/place/@49.922935, 8.849602,9z/"),75175, "26.05.2020"),
            // new StationsRatingModel(new Location("Germany", "Frankfurt", "Elinos 34-10", "https://www.google.ru/maps/place/@49.922935, 8.849602,9z/"),75175, "26.05.2020")
        ];
    }

    StationsRating.prototype.GetObjects = function () {
        return this.objs.sort( (x, y) => {
            return y.qtyChargingEvents - x.qtyChargingEvents;
        });
        //return [];
    }

    StationsRating.prototype.GetObjectsByCountryCity = function(country, city) {
        let objs = this.GetObjects();

        if(country != "All") {
            objs = objs.filter(x => x.location.country == country);
        }

        if(city != "All") {
            objs = objs.filter(x => x.location.city == city);
        }

        return objs;
    }

    StationsRating.prototype.GetObjectsByCountryCityAndDate = function(country, city, start, end) {
        let objs = this.GetObjects();

        if(country != "All") {
            objs = objs.filter(x => x.location.country == country);
        }

        if(city != "All") {
            objs = objs.filter(x => x.location.city == city);
        }

        objs = objs.filter(x => DateTimeParser.InRangeDate(start, end, x.date));

        return objs;
    }

    StationsRating.prototype.GetLocations = function () {
        let objs = this.GetObjects();

        // let rez  = objs.map( x => {
        //     let obj = {};
        //     obj[x.location.GetString] = x.location.GetGeoPos();
        //     return obj;
        // });

        //rez = ["All", [55.825973, 17.98517, 4]].concat(rez);

        return objs.map( x => x.location);
    }

    return StationsRating;
})();