let CitiesModel = (function(){
    let locations = {
        'All': [55.825973, 17.98517, 4],
        //'Kiev' : [50.445262, 30.531903],
        'Riga' : [56.926993, 24.127669]//,
        // 'Tallin' : [59.369593, 24.739754],
        // 'Helsinki' : [60.23163, 24.920331],
        // 'Amsterdam': [52.335339, 4.946472],
        // 'Paris' : [48.84592, 2.333719],
        // 'Warsaw' : [52.214339, 20.899708],
        // 'Frankfurt' : [49.922935, 8.849602]
    };

    function CitiesModel() {

    };

    CitiesModel.prototype.GetLocations = function () {
        let r = [];

        for(let l in locations)
        {
            r.push(new Location("", l, locations[l], ""));
        }

        return r;
    }

     return CitiesModel;
})();