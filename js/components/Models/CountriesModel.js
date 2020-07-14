

let CountriesModel = (function(){
    let countries = {
        "All": ["All"],
        //"Ukraine" : ["Kiev"],
        "Latvia": ["Riga"]//,  "Valmiera"
        // "Estonia": ["Tallin"],
        // "Finland": ["Helsinki"],
        // "Netherlands" : ["Amsterdam"],
        // "France" : ["Paris"],
        // "Poland" : ["Warsaw"],
        // "Germany" : ["Berlin", "Frankfurt"]
    };

    function CountriesModel() {
    };

    CountriesModel.prototype.GetCitiesByCountry = function (county) {
        let cities = countries[county];
        if(typeof cities == "undefined")
            return ["-"];

        if(cities.length == 0 || county == "All") {
            cities = this.GetAllCities();
        }
        else {
            cities = ["All"].concat(cities);
        }

        return cities;
    }

    CountriesModel.prototype.GetAllCities = function() {
        let rez = [];
        for (let c in countries)
            rez = rez.concat(countries[c]);

        return rez;
    }

    CountriesModel.prototype.GetCountries = function() {
        let rez = [];
        for (let c in countries)
            rez.push(c);
        return rez;
    }

    CountriesModel.prototype.GetLocations = function() {
        let rez = [];
        let cnts = countries;

        for(let country in cnts)
        {
            if(country == 'All')
                continue;

            cnts[country].forEach( c => {
                rez.push(new Location(country, c, "", ""));
            });
        }

        return rez;
    }

    return CountriesModel;
})();

let CountriesModel2 = (function(){
    let countries = {
        "All": ["All"],
        "Israel": ["Tel Aviv"]
    };

    function CountriesModel2() {
    };

    CountriesModel2.prototype.GetCitiesByCountry = function (county) {
        let cities = countries[county];
        if(typeof cities == "undefined")
            return ["-"];

        if(cities.length == 0 || county == "All") {
            cities = this.GetAllCities();
        }
        else {
            cities = ["All"].concat(cities);
        }

        return cities;
    }

    CountriesModel2.prototype.GetAllCities = function() {
        let rez = [];
        for (let c in countries)
            rez = rez.concat(countries[c]);

        return rez;
    }

    CountriesModel2.prototype.GetCountries = function() {
        let rez = [];
        for (let c in countries)
            rez.push(c);
        return rez;
    }

    CountriesModel2.prototype.GetLocations = function() {
        let rez = [];
        let cnts = countries;

        for(let country in cnts)
        {
            if(country == 'All')
                continue;

            cnts[country].forEach( c => {
                rez.push(new Location(country, c, "", ""));
            });
        }

        return rez;
    }

    return CountriesModel2;
})();

