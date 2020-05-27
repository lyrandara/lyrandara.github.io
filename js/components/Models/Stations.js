// Station //
function Station() {
  let args = Array.from(arguments);

  this.selected = false;

  this.stationId = args[0];
  this.name = args[1];
  this.totalSlots = args[2];
  this.remainSlots = args[3];
  this.totalPower = args[4];
  this.currentPower = args[5];
  this.location = args[6];
  this.status = args[7];  // 1 - ok, 0 - disabled, -1  - error

}

Object.defineProperty(Station.prototype, "GetStatusClass", {
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
  return new Station(s.stationId, s.name, s.totalSlots, s.remainSlots
    , s.totalPower, s.currentPower, s.location, s.status);
}

// end Station //

// Factory //
let Factory = {
  CreateDefaultStation() {
    return new Station("", "", "", "", "", "", "", 0);
  }
};
// end Factory //

// StationsAggregator //
let StationsAggregator = (function () {

  const StatusType = Object.freeze({"Error": -1, "Disabled": 0, "Enabled": 1});
  const titles = ["default", "Add station", "Update station"];

  const StateType = Aggregator.StateType;

  function StationsAggregator() {

    this.stations = [
      new Station(1, "Station 1", 10, 2, 100000, 80, "Station 1 location", StatusType.Error),
      new Station(2, "Station 2", 5, 1, 22133, 75, "Station 2 location", StatusType.Disabled),
      new Station(3, "Station 3", 7, 3, 1020, 70, "Station 3 location", StatusType.Enabled),
      new Station(3, "Station 4", 8, 4, 1020, 70, "Station 4 location", StatusType.Enabled),
      new Station(3, "Station 5", 9, 5, 1020, 70, "Station 5 location", StatusType.Enabled)
    ];
  }

  // Implement interface functions //
  StationsAggregator.prototype.GetTitles = function () {
    return titles;
  }

  StationsAggregator.prototype.GetObjects = function () {
    return this.stations;
  }

  StationsAggregator.prototype.CreateDefaultModel = function () {
    return Factory.CreateDefaultStation();
  }

  return StationsAggregator;
})();
// end StationsAggregator //

