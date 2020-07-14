Slot.Satatus = Object.freeze({
  Occupied: "Occupied",
  Available: "Available",
  Unavailable: "Unavailable"
});

Slot.Info = Object.freeze({Online: "Online", Offline: "Offline"});


function Slot(id, status, info, chargeLevel) {
  this.id = id;
  this.status = info && status == Slot.Satatus.Unavailable ? Slot.Satatus.Available : status;
  this._info = info;
  this.chargeLevelVal = chargeLevel;
  this.selected = false;
}

Object.defineProperty(Slot.prototype, "status", {
  set(val) {
    this._status = val;
  },
  get() {
    return this._info ? this._status : Slot.Satatus.Unavailable;
  }
});

Object.defineProperty(Slot.prototype, "info", {
  get() {
    return this._info;
  },
  set(value) {
    this._info = value;
  }
});

Object.defineProperty(Slot.prototype, "infoString", {
  get() {
    return this._info ? Slot.Info.Online :  Slot.Info.Offline;
  }
})


Slot.prototype.Clone = function() {
  let s = this;
  return new Slot(s.id, s.status, s.info, s.chargeLevelVal);
}

Slot.Default = function() {
  return new Slot("", Slot.Satatus.Unavailable, false, 0)
}



Object.defineProperty(Slot.prototype, "chargeLevel", {
  get() {
    return this.chargeLevelVal == -1 || this.status == Slot.Satatus.Unavailable || this.status == Slot.Satatus.Available ? "-" : this.chargeLevelVal;
  }
});

function Location(country, city, appendix, geopos) {
  this.country = country || '';
  this.city = city  || '';
  this.appendix = appendix  || '';

  this.geopos = geopos  || '';
}

Location.prototype.GetGeoPos = function () {
  return this.geopos.map(x => x);
}

Object.defineProperty(Location.prototype, "url", {
  get() {
    if(typeof this.geopos == "string") {
      return this.geopos;
    }

    let pos = [56.9500885, 24.0319015];
    if(typeof this.geopos == "object" && this.geopos.length >= 2) {
      pos = this.geopos;
    }

    return "https://www.google.ru/maps/place/@" + pos.join(",") + ",9z/";
  }
});

Location.CreateDefault = function () {
  return new Location();
};

// Implement interface function //
Location.prototype.Clone = function() {
  let s = this;
  return new Location(s.country, s.city, s.appendix, s.url);
}

Object.defineProperty(Location.prototype, "GetString", {
  get() {
    return this.appendix.trim().length > 0 ? this.city + ", " + this.appendix : this.city;
  }
});

// Station //
function Station() {
  let args = Array.from(arguments);

  this.selected = false;

  this.stationId = args[0];
  this.slots = args[1];

  this.location = args[2];
}

Object.defineProperty(Station.prototype, "GetStatus", {
  get: function () {

    if (this.status == 0) return "text-secondary";
    else if (this.status == 1) return "text-success";
    else if (this.status == -1) return "text-danger";
    else return "text-secondary";
  }
});

// Implement interface function //
Station.prototype.Clone = function() {
  let s = this;
  return new Station(s.stationId, s.slots.map(x => x.Clone()), s.location.Clone());
}

// end Station //

// StationFactory //
let StationFactory = {
  CreateDefaultStation() {
    return new Station("", [], Location.CreateDefault())
  }
};
// end StationFactory //

// StationsAggregator //
let StationsAggregator = (function () {
  const titles = ["default", "Add station", "Update station"];

  function StationsAggregator() {

    // this.stations = [
    //   new Station("XX:YY:ZZ:QQ", [
    //       new Slot("XX:YY:ZZ:WW", Slot.Satatus.Occupied, true, 50),
    //       new Slot("XX:YY:ZZ:EE",Slot.Satatus.Unavailable, false, -1),
    //       new Slot("XX:YY:ZZ:SS",Slot.Satatus.Occupied, true, 16),
    //       new Slot("XX:YY:ZZ:RR",Slot.Satatus.Occupied, true, 16)
    //   ], new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/")),
    //   new Station("XX:YY:22:QQ", [
    //     new Slot("XX:YY:ZZ:WW", Slot.Satatus.Available, true, -1),
    //     new Slot("XX:YY:ZZ:EE",Slot.Satatus.Occupied, true, 78),
    //     new Slot("XX:YY:ZZ:SS",Slot.Satatus.Unavailable, false, -1),
    //     new Slot("XX:YY:ZZ:RR",Slot.Satatus.Unavailable, false, -1)
    //   ], new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/")),
    //   new Station("XX:YY:33:QQ", [
    //     new Slot("XX:YY:ZZ:WW", Slot.Satatus.Unavailable, false, -1),
    //     new Slot("XX:YY:ZZ:EE",Slot.Satatus.Occupied, true, 50),
    //     new Slot("XX:YY:ZZ:SS",Slot.Satatus.Available, true, -1),
    //     new Slot("XX:YY:ZZ:RR",Slot.Satatus.Occupied, true, 16)
    //   ], new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/")),
    //   new Station("XX:YY:44:QQ", [
    //     new Slot("XX:YY:ZZ:WW", Slot.Satatus.Occupied, true, 11),
    //     new Slot("XX:YY:ZZ:EE",Slot.Satatus.Occupied, true, 50),
    //     new Slot("XX:YY:ZZ:SS",Slot.Satatus.Occupied, true, 50),
    //     new Slot("XX:YY:ZZ:RR",Slot.Satatus.Occupied, true, 16)
    //   ], new Location("Latvia", "Valmiera", "Some street 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/")),
    //   new Station("XX:YY:44:QQ", [
    //     new Slot("XX:YY:ZZ:WW", Slot.Satatus.Occupied, true, 16),
    //     new Slot("XX:YY:ZZ:EE",Slot.Satatus.Occupied, false, 17),
    //     new Slot("XX:YY:ZZ:SS",Slot.Satatus.Occupied, true, 18),
    //     new Slot("XX:YY:ZZ:RR",Slot.Satatus.Occupied, true, 16)
    //   ], new Location("Ukraine", "Kiev", "Pushkin street 34-3", "https://www.google.ru/maps/@50.4339847,30.5316211,11.67z"))
    // ];
    this.stations = [
      new Station("45:64:1A:32", [
        new Slot("12:64:22:34", Slot.Satatus.Occupied, true, 50),
        new Slot("68:88:CE:8A",Slot.Satatus.Occupied, true, 13),
        new Slot("1B:74:BA:58",Slot.Satatus.Available, true, 16),
        new Slot("C9:E5:19:CF",Slot.Satatus.Available, true, 16)
      ], new Location("Israel", "Tel Aviv", "HaCarmel St 48", [32.068683,34.7668583,17])),
      new Station("45:64:5A:32", [
        new Slot("3B:E3:EC:CE", Slot.Satatus.Available, true, -1),
        new Slot("1A:EB:FC:5B",Slot.Satatus.Available, true, 78),
        new Slot("3C:DA:61:2E",Slot.Satatus.Occupied, true, 89),
        new Slot("51:1D:DE:AB",Slot.Satatus.Occupied, true, 63)
      ], new Location("Israel", "Tel Aviv", "Ahad Ha'Am St 43", [32.0655783,34.7735893,17])),
      new Station("45:64:5A:32", [
        new Slot("41:25:8B:16", Slot.Satatus.Available, true, -1),
        new Slot("97:B9:FE:F8",Slot.Satatus.Occupied, true, 50),
        new Slot("B5:47:EC:A2",Slot.Satatus.Available, true, -1),
        new Slot("83:B8:CE:C2",Slot.Satatus.Occupied, true, 16)
      ], new Location("Israel", "Tel Aviv", "Tchernikhovski St 24", [32.0741166,34.7708168,17])),
      new Station("45:64:4A:32", [
        new Slot("B7:9F:4C:99", Slot.Satatus.Available, true, -1),
        new Slot("42:2C:DE:D3",Slot.Satatus.Available, true, -1),
        new Slot("31:9F:AC:B3",Slot.Satatus.Occupied, true, 50),
        new Slot("AC:D1:EF:A4",Slot.Satatus.Occupied, true, 16)
      ], new Location("Israel", "Tel Aviv", "Tarsat Ave 2", [32.0725914,34.7767774,17])),
      new Station("45:64:3A:32", [
        new Slot("76:3B:51:CB", Slot.Satatus.Available, true, -1),
        new Slot("5F:B2:6A:BF",Slot.Satatus.Occupied, true, 17),
        new Slot("4D:7C:8B:E3",Slot.Satatus.Occupied, true, 18),
        new Slot("43:E2:32:CA",Slot.Satatus.Available, true, 16)
      ], new Location("Israel", "Tel Aviv", "HaGdud Haivri St 8", [32.0603079,34.7727862,17]))
    ];
  }

  // Implement interface functions //
  StationsAggregator.prototype.GetTitles = function () {
    return titles;
  }

  StationsAggregator.prototype.GetObjects = function () {
    return this.stations;
  }

  StationsAggregator.prototype.GetObjectsByCountryCity = function(country, city) {
    let stations = this.GetObjects();

    if(country != "All") {
      stations = stations.filter(x => x.location.country == country);
    }

    if(city != "All") {
      stations = stations.filter(x => x.location.city == city);
    }

    return stations;
  }

  StationsAggregator.prototype.CreateDefaultModel = function () {
    return StationFactory.CreateDefaultStation();
  }

  return StationsAggregator;
})();
// end StationsAggregator //

