
let StationsComponent = (function () {

  let $ = jQuery;

  let statusComponent = StatusComponent(new StationStatusModel());

  let StateType = Aggregator.StateType;

  function Init() {
    setTimeout(() => {

        $("input[data-bootstrap-switch]").each(function() {

          //let s = $(this).prop('checked');

          $(this).bootstrapToggle('destroy');
          $(this).off('change');

          $(this).bootstrapToggle({
            size: 'mini',
            onstyle: 'success',
            offstyle: 'danger',
            height: 10
          })

          $(this).data('disabled', false);

          $(this).on('change', function (e) {

            if (!$(this).data('disabled')) {
              $(this).data('disabled', true);
              $(this).click();
              $(this).data('disabled', false);
            }

          });
        });
    }, 10);
  };

  function StationsComponent(vueModel, defCountryCity, countries) {
    let _this = this;

    if(typeof defCountryCity == "undefined")
      defCountryCity = {};

    countries = countries || new CountriesModel();

    let countriesComponent = CountriesComponent(countries);

    let stationsModel = new StationsAggregator();
    let sAgg = new Aggregator(stationsModel);

    let padsComponent = new PadsComponent(vueModel);

    padsComponent.CallBack = function() {
      Log.trace("CallBack");
    }

    this.GetStations = function () {
      return stationsModel.GetObjects();
    }

    this.GetStationsModel = function () {
      return stationsModel;
    }

    this.LoadPads = function() {
      padsComponent.LoadPads(sAgg.GetDefaultModel().slots);
    }

    this.SavePads = function() {
      sAgg.GetDefaultModel().slots = padsComponent.GetPads();
      Init();
    }

    VueModelInitial(vueModel);

    let countriesComponentObj = new countriesComponent(vueModel, defCountryCity.country, defCountryCity.city);
    let statusComponentObj = new statusComponent(vueModel);


    this.countriesComponentObj = countriesComponentObj;
    this.statusComponentObj = statusComponentObj;

    this.CalcStationsBrief(_this.GetStations(), vueModel.data);

    CopyObjects(vueModel.data, {
      stationsAggregator: sAgg,
      stations: _this.GetStations()
    });

    CopyObjects(vueModel.methods, {
      OnAddStation: function () {
        sAgg.AddModelEvent();
        padsComponent.ResetPads();
      },
      OnEditStation: function () {
        try {
          sAgg.EditModelEvent();
          _this.LoadPads();

          ModalWindows.ShowStationModal();
        } catch (e) {
          ModalWindows.ShowError(e);
        }
      },
      OnStationsAggregatorSubmit() {
        try {
          _this.SavePads();

          let mode = sAgg.Mode;
          if (sAgg.Submit()) {
            if (mode == StateType.Add) {
              ModalWindows.ShowSuccess("Station added");
            } else if (mode == StateType.Edit) {
              ModalWindows.ShowSuccess("Station updated");
            }
          }
          else {
            ModalWindows.HideStationModal();
          }

          _this.Filter();
        } catch (e) {
          ModalWindows.ShowError("OnStationsAggregatorSubmit: " + e);
        }
      },
      OnDeleteStation() {
        sAgg.DeleteModel();
        _this.Filter();
        Init();
      },
      OnStationsAggregatorOnCheckClick(e) {
        sAgg.OnCheckClick(e);
      }
    });

    countriesComponentObj.Callback = function (country, city) {
      _this.Filter();
    }

    statusComponentObj.Callback = function (inStatus) {
      Log.trace(inStatus);
      _this.Filter();
    }

    vueModel.userInitsCallbacks.push(() => {
      _this.Filter();
    });

    this.model = vueModel;
  }

  StationsComponent.prototype.Filter = function()
  {
    let statusComponentObj = this.statusComponentObj;

    let inFilter = statusComponentObj.GetStatus();

    if(typeof inFilter == "undefined")
      return;

    let countriesComponentObj = this.countriesComponentObj;

    let stationsModel = this.GetStationsModel();

    let country = countriesComponentObj.GetCountry();
    let city = countriesComponentObj.GetCity();

    let stations = stationsModel.GetObjectsByCountryCity(country, city);

    if(inFilter != "All") {

      let newStations = [];

      for (let s in stations) {
        if (typeof stations[s].slots != "undefined") {

          let newSlots = stations[s].slots.filter(s => s.status == inFilter || s.infoString == inFilter);

          if (newSlots.length > 0) {

            let newStation = stations[s].Clone();

            newStation.slots = newSlots;

            newStations.push(newStation);
          }

          //Log.trace(stations[s]);
        }
      }

      this.SetStations(newStations);

      return;
    }

    this.SetStations(stations);
  }

  StationsComponent.prototype.SetStations = function(stations) {
    this.model.data.stations = stations;

    this.CalcStationsBrief(stations, this.model.data)

    Init();
  }

  StationsComponent.prototype.CalcStationsBrief = function(stations, data) {
    if(typeof stations == "undefined" || typeof data == "undefined")
      return;

    let s = stations; //this.GetStations();

    data.stationsNumber = s.length;
    data.slotsNumber = stations.map(x => x.slots.length).reduce((a, b) => a + b, 0);
    data.slotsAvailableNumber = stations.map(x => x.slots.filter(y => y.status == Slot.Satatus.Available).length).reduce((a, b) => a + b, 0);
    data.slotsOccupiedNumber = stations.map(x => x.slots.filter(y => y.status == Slot.Satatus.Occupied).length).reduce((a, b) => a + b, 0);
    data.slotsOfflineNumber = stations.map(x => x.slots.filter(y => y.info == Slot.Info.Offline).length).reduce((a, b) => a + b, 0);
  }

  return StationsComponent;
})();
