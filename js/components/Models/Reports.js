function Report(date, location, chargingQty, totalPower, totalTime, totalPrice){
    if(typeof date == "string") {
        this.date = DateTimeParser.FromString(date);
    }
    else
        this.date = date;

    this.location = location;
    this.chargingQty = chargingQty;
    this.totalPower = totalPower;
    this.totalTime = totalTime;
    this.totalPrice = totalPrice;
}

Object.defineProperty(Report.prototype, "getDateString", {
    get() {
        return DateTimeParser.ToString(this.date);
    }
});


let Reports = (function () {

    function GetReps() {
        return [
            new Report("10.04.2020", new Location("Ukraine", "Kiev", "Pushkin street 34-3", "https://www.google.ru/maps/@50.4339847,30.5316211,11.67z"),
                1891, 15, "12 h 30 min", "100"
            ),
            new Report("10.04.2020", new Location("Ukraine", "Kiev", "Pushkin street 34-2", "https://www.google.ru/maps/@50.4339847,30.5316211,11.67z"),
                1356, 96, "69 h 32 min", "120"
            ),
            new Report("10.04.2020", new Location("Ukraine", "Kiev", "Pushkin street 34-1", "https://www.google.ru/maps/@50.4339847,30.5316211,11.67z"),
                367, 345, "98 h 21 min", "110"
            ),
            new Report("01.06.2020", new Location("Ukraine", "Kiev", "Pushkin street 34-7", "https://www.google.ru/maps/@50.4339847,30.5316211,11.67z"),
                289, 32, "96 h 42 min", "111"
            ),
            new Report("15.06.2020", new Location("Ukraine", "Kiev", "Pushkin street 34-4", "https://www.google.ru/maps/@50.4339847,30.5316211,11.67z"),
                16, 78, "98 h 30 min", "117"
            ),
            new Report("15.06.2020",  new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/"),
                21, 67, "987 h 30 min", "125"
            ),
            new Report("14.06.2020",  new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/"),
                89, 343, "654 h 31 min", "114"
            ),
            new Report("12.06.2020",  new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/"),
                13, 2325, "121 h 24 min", "200"
            ),
            new Report("07.07.2020",  new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/"),
                66, 111, "78 h 31 min", "222"
            ),
            new Report("02.05.2020",  new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/"),
                93, 467, "142 h 10 min", "331"
            ),
            new Report("06.05.2020",  new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/"),
                124, 999, "54 h 11 min", "121"
            ),
            new Report("05.10.2020",  new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/"),
                743, 33, "16 h 18 min", "50"
            ),
            new Report("25.05.2020",  new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/"),
                18, 65, "20 h 55 min", "16"
            )
        ];
    }

    function GetReps2() {
        let objs = [];

        //let daysArray = [...Array(moment().endOf('month').date() + 1).keys()].slice(1);

        //let days = 10;
        let events = 1200;
        let powers = 960;
        let minutes = 2400;

        let rezPrice = 420;

        let data = [
            [33,26.4,66,11.55],
            [45,36,90,15.75],
            [38,30.4,76,13.3],
            [40,32,80,14],
            [42,33.6,84,14.7],
            [38,30.4,76,13.3],
            [35,28,70,12.25],
            [37,29.6,74,12.95],
            [30,24,60,10.5],
            [48,38.4,96,16.8],
            [50,40,10,17.5],
            [45,36,90,15.75],
            [29,23.2,58,10.15],
            [45,36,90,15.75],
            [34,27.2,68,11.9],
            [34,27.2,68,11.9],
            [45,36,90,15.75],
            [40,32,80,14],
            [30,20,20,5.75],
            [15,18,25,10.75],
            [45,36,90,15.75],
            [45,36,90,15.75],
            [48,38.4,96,16.8],
            [38,30.4,76,13.3],
            [34,27.2,68,11.9],
            [36,28.8,72,12.6],
            [38,30.4,76,13.3],
            [43,34.4,86,15.05],
            [43,34.4,86,15.05],
            [37,29.6,74,12.95],
            [40,32,80,14]
        ];

        // data.forEach( x=> {
        //      new Report("10.06.2020", new Location("Israel", "Tel Aviv", "HaCarmel St 48", [32.068683,34.7668583,17]),
        //         1891, 15, "12 h 30 min", "100"
        //     )
        // });




        objs = data.map((x, index) =>  new Report(("0"+(index + 1)).slice(-2) + ".05.2020", new Location("Israel", "Tel Aviv", "HaCarmel St 48", [32.068683,34.7668583,17]),
            x[0], x[1], x[2] + " h", x[3]
        ));

        Log.trace(objs);

        return objs;
    }

    function Reports() {
        this.objs = GetReps2();
    }

    Reports.prototype.GetObjects = function () {
        return this.objs;
    }

    Reports.prototype.GetObjectsByCityAndDate = function(city, start, end) {
        let objs = this.GetObjects();

        if(city != "All") {
            objs = objs.filter(x => x.location.city == city);
        }

        objs = objs.filter(x => DateTimeParser.InRangeDate(start, end, x.date));

        return objs;
    }



    return Reports;
})();