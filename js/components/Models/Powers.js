let Powers = (function () {

    const nCount = 24;

    function Power(location, powers) {
        this.location = location;
        this.powers = powers;
    }

    function GenerateRandomPowersData() {
        let data = []
        for (let i = 0; i < nCount; i++ ) {
            data.push(Math.random() * 0.2 + 79)
        }

        return data;
    }

    function GetXord() {
        let xOrd = []
        for (let i = 0; i < nCount; i++ ) {
            xOrd.push(i);
        }

        return xOrd;
    }

    function Powers() {

        this.objs = [
            new Power(new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/"), GenerateRandomPowersData()),
            new Power(new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/"), GenerateRandomPowersData()),
            new Power(new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/"), GenerateRandomPowersData()),
            new Power(new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/"), GenerateRandomPowersData()),
            new Power( new Location("Latvia", "Valmiera", "Some street 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/"), GenerateRandomPowersData()),
            new Power( new Location("Latvia", "Valmiera", "Some street 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/"), GenerateRandomPowersData()),
            new Power( new Location("Latvia", "Valmiera", "Some street 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/"), GenerateRandomPowersData()),
            new Power(new Location("Ukraine", "Kiev", "Pushkin street 34-3", "https://www.google.ru/maps/@50.4339847,30.5316211,11.67z"), GenerateRandomPowersData()),
            new Power(new Location("Estonia", "Tallin", "Pushkin street 34-3", "https://www.google.ru/maps/@50.4339847,30.5316211,11.67z"), GenerateRandomPowersData()),
        ];

    }

    Powers.prototype.GetPowersByLocation = function (country, city) {

        let objs = this.objs;

        if(country != "All") {
            objs = objs.filter(x => x.location.country == country);
        }

        if(city != "All") {
            objs = objs.filter(x => x.location.city == city);
        }

        let data = objs.map(x => x.powers);

        let result = [];

        for (let j = 0; j < nCount; j++ ) {
            let sum = 0;
            for (let i = 0; i < data.length; i++ ) {
                sum += data[i][j];
            }
            result.push(sum);
        }

        return GetXord().map((x, index) => {
            return [x, result[index]];
        });
    }

    Powers.prototype.GetPowerPerMonth = function () {
        return 1678;
    }



    return Powers;
})();