let Scooter = (function(){
    const Status = {
      Charging : "Charging", Charged : "Charged", Offline: "Not charging"
    };
    const Permission = {
        Granted : "Granted", Granted : "Granted"
    };
    function Scooter(id, type, chargeLevel, status, permission, location)
    {
        this.id = id;
        this.type = type;
        this._chargeLevel = chargeLevel;
        this.status = status;
        this.permission = permission;
        this.location = location;
    }

    Scooter.Status = Status;
    Scooter.Permission = Permission;

    Object.defineProperty(Scooter.prototype, "chargeLevel",{
       get() {
           return this.status == Status.Charging ? this._chargeLevel : '-';
       }
    });

    return Scooter;
})();

let Scooters = (function() {

    const Status = Scooter.Status;

    function Scooters() {
        // this.scooters = [
        //     new Scooter("XX:YY:ZZ:QQ", "Segway", 50, Scooter.Status.Charging, Scooter.Permission.Granted,
        //         new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/")),
        //     new Scooter("XX:YY:ZZ:QQ", "Segway", 50, Scooter.Status.Charging, Scooter.Permission.Granted,
        //         new Location("Ukraine", "Kiev", "Pushkin street 34-3", "https://www.google.ru/maps/@50.4339847,30.5316211,11.67z")),
        //     new Scooter("XX:YY:ZZ:QQ", "Segway", 50, Scooter.Status.Charging, Scooter.Permission.Granted,
        //         new Location("Latvia", "Valmiera", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/")),
        //     new Scooter("XX:YY:ZZ:QQ", "Segway", 50, Scooter.Status.Offline, Scooter.Permission.Granted,
        //         new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/")),
        //     new Scooter("XX:YY:ZZ:QQ", "Segway", 50, Scooter.Status.Charging, Scooter.Permission.Granted,
        //         new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/")),
        //     new Scooter("XX:YY:ZZ:QQ", "Segway", 50, Scooter.Status.Charged, Scooter.Permission.Granted,
        //         new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/")),
        //     new Scooter("XX:YY:ZZ:QQ", "Segway", 50, Scooter.Status.Offline, Scooter.Permission.Granted,
        //         new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/")),
        //     new Scooter("XX:YY:ZZ:QQ", "Segway", 50, Scooter.Status.Charging, Scooter.Permission.Granted,
        //         new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/")),
        //     new Scooter("XX:YY:ZZ:QQ", "Segway", 50, Scooter.Status.Charging, Scooter.Permission.Granted,
        //         new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/"))
        // ];

        this.scooters = [
            new Scooter("DD:29:F4:A8", "Segway", 33, Scooter.Status.Charging, Scooter.Permission.Granted, new Location("Israel", "Tel Aviv", "HaCarmel St 48", [32.068683,34.7668583,17])),
            new Scooter("FE:45:6E:F7", "Segway", 45, Scooter.Status.Charging, Scooter.Permission.Granted, new Location("Israel", "Tel Aviv", "HaCarmel St 48", [32.068683,34.7668583,17])),
            new Scooter("A5:9D:1E:AF", "Segway", 38, Scooter.Status.Charging, Scooter.Permission.Granted, new Location("Israel", "Tel Aviv", "Tel Aviv, Ahad Ha'Am St 43", [32.068683,34.7668583,17])),
            new Scooter("8E:B7:5C:D2", "Segway", 40, Scooter.Status.Charging, Scooter.Permission.Granted, new Location("Israel", "Tel Aviv", "Tel Aviv, Ahad Ha'Am St 43", [32.068683,34.7668583,17])),
            new Scooter("48:DC:C3:23", "Segway", 42, Scooter.Status.Charging, Scooter.Permission.Granted, new Location("Israel", "Tel Aviv", "Tel Aviv, Tchernikhovski St 24", [32.068683,34.7668583,17])),
            new Scooter("43:88:8C:A3", "Segway", 38, Scooter.Status.Charging, Scooter.Permission.Granted, new Location("Israel", "Tel Aviv", "Tel Aviv, Tchernikhovski St 24", [32.068683,34.7668583,17])),
            new Scooter("5E:6A:99:8E", "Segway", 35, Scooter.Status.Charging, Scooter.Permission.Granted, new Location("Israel", "Tel Aviv", "Tel Aviv, Tarsat Ave 2", [32.068683,34.7668583,17])),
            new Scooter("E6:9E:C5:44", "Segway", 37, Scooter.Status.Charging, Scooter.Permission.Granted, new Location("Israel", "Tel Aviv", "Tel Aviv, Tarsat Ave 2", [32.068683,34.7668583,17])),
            new Scooter("DF:BE:C7:1E", "Segway", 30, Scooter.Status.Charging, Scooter.Permission.Granted, new Location("Israel", "Tel Aviv", "Tel Aviv, HaGdud Haivri St 8", [32.068683,34.7668583,17])),
            new Scooter("59:65:8F:7F", "Segway", 48, Scooter.Status.Charging, Scooter.Permission.Granted, new Location("Israel", "Tel Aviv", "Tel Aviv, HaGdud Haivri St 8", [32.068683,34.7668583,17])),
            new Scooter("FE:A4:1C:F5", "Segway", 50, Scooter.Status.Offline, Scooter.Permission.Granted,  new Location("Israel", "Tel Aviv", "Ahad Ha'Am St 43", [32.0655783,34.7735893]) ),
            new Scooter("B2:51:B5:BF", "Segway", 45, Scooter.Status.Offline, Scooter.Permission.Granted,  new Location("Israel", "Tel Aviv", "Tchernikhovski St 24", [32.0741166,34.7708168]) ),
            new Scooter("DE:17:AA:7F", "Segway", 29, Scooter.Status.Offline, Scooter.Permission.Granted,  new Location("Israel", "Tel Aviv", "Tarsat Ave 2", [32.0725914,34.7767774]) ),
            new Scooter("E8:CC:93:94", "Segway", 45, Scooter.Status.Offline, Scooter.Permission.Granted,  new Location("Israel", "Tel Aviv", "HaGdud Haivri St 8", [32.0603079,34.7727862]) ),
            new Scooter("BF:6B:38:37", "Segway", 34, Scooter.Status.Offline, Scooter.Permission.Granted,  new Location("Israel", "Tel Aviv", "Tchernikhovski St 24", [32.0741166,34.7708168]) ),
            new Scooter("E7:18:52:91", "Segway", 34, Scooter.Status.Offline, Scooter.Permission.Granted,  new Location("Israel", "Tel Aviv", "Tchernikhovski St 24", [32.0741166,34.7708168]) ),
            new Scooter("B3:35:47:FF", "Segway", 45, Scooter.Status.Offline, Scooter.Permission.Granted,  new Location("Israel", "Tel Aviv", "HaGdud Haivri St 8", [32.0603079,34.7727862]) ),
            new Scooter("87:56:9F:26", "Segway", 40, Scooter.Status.Offline, Scooter.Permission.Granted,  new Location("Israel", "Tel Aviv", "Tchernikhovski St 24", [32.0741166,34.7708168]) ),
            new Scooter("37:4D:B3:A8", "Segway", 45, Scooter.Status.Offline, Scooter.Permission.Granted,  new Location("Israel", "Tel Aviv", "HaCarmel St 48", [32.068683,34.7668583,17]) ),
            new Scooter("3C:49:3A:C1", "Segway", 45, Scooter.Status.Offline, Scooter.Permission.Granted,  new Location("Israel", "Tel Aviv", "HaGdud Haivri St 8", [32.0603079,34.7727862]) )
        ];
    }

    Scooters.prototype.GetObjects = function () {
        return this.scooters;
    }

    Scooters.prototype.GetObjectsByCountryCityStatus = function(country, city, inStatus) {

        let scooters = this.GetObjects();

        if(country != "All") {
            scooters = scooters.filter(x => x.location.country == country);
        }

        if(city != "All") {
            scooters = scooters.filter(x => x.location.city == city);
        }

        if(inStatus != "All") {
            scooters = scooters.filter(x => x.status == inStatus || (inStatus == "Not on charge" && (x.status == Status.Offline || x.status == Status.Charged)));
        }

        return scooters;
    }

    return Scooters;
})();