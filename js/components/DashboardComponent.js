let DashboardComponent = (function () {

    const $ = jQuery;

    let Map = MapComponent();
    let countriesComponent = CountriesComponent();

    let Charts = {
        DrawPower(data) {
            if (jQuery('#power-chart').length > 0) {

                //Log.trace(data);

                let power_data = {
                    data: data,
                    color: '#3c8dbc'
                }
                $.plot('#power-chart', [power_data], {
                    grid: {
                        hoverable: true,
                        borderColor: '#f3f3f3',
                        borderWidth: 1,
                        tickColor: '#f3f3f3'
                    },
                    series: {
                        shadowSize: 0,
                        lines: {
                            show: true
                        },
                        points: {
                            show: true
                        }
                    },
                    lines: {
                        fill: false,
                        color: ['#3c8dbc', '#f56954']
                    },
                    yaxis: {
                        show: true
                    },
                    xaxis: {
                        show: true,
                        max: 24
                    }
                });
            }
        },
        DrawMoneys(data) {
            if (jQuery('#moneys-chart').length > 0 && typeof data != "undefined") {
                let moneys_data = {
                    data: data.map((x, index) => [index+1, x]),
                    bars: {show: true}
                }
                $.plot('#moneys-chart', [moneys_data], {
                    grid: {
                        borderWidth: 1,
                        borderColor: '#f3f3f3',
                        tickColor: '#f3f3f3'
                    },
                    series: {
                        bars: {
                            show: true, barWidth: 0.5, align: 'center',
                        },
                    },
                    colors: ['#3c8dbc'],
                    xaxis: {
                        ticks: [
                            [1, 'Jan'], [2, 'Feb'], [3, 'Mar'], [4, 'Apr'], [5, 'May'], [6, 'June'], [7, 'July'],
                            [8, 'Aug'], [9, 'Sept'], [10, 'Oct'], [11, 'Nov'], [12, 'Dec'],
                        ]
                    }
                })
            }
        }
    }

    function DashboardComponent(vueModel) {
        let _this = this;

        this.powers = new Powers();
        this.balance = new Balance();

        this.model = vueModel;

        let mvLoading = new LoadingComponent(vueModel);

        //let mapObj = new Map(vueModel);

        let headerInfo = new HeaderInfo(vueModel);

        let countriesComponentObj = new countriesComponent(vueModel);

        this.countriesComponentObj = countriesComponentObj;

        countriesComponentObj.Callback = function (country, city) {
           // _this.Filter();
        }

        CopyObjects(vueModel, {
            mounted() {
                mvLoading.Hide();

                VueExts.RunInitCallBacks(vueModel);
            }
        });

        vueModel.userInitsCallbacks.push(()=> {
            Charts.DrawMoneys(_this.balance.GetСostsPerMonth());

            //_this.Filter();
        });

        let stationsModel = new StationsAggregator();
        let scootersModel = new Scooters();

        this.GetStations = function () {
            return stationsModel.GetObjects();
        }

        this.GetStationsModel = function () {
            return stationsModel;
        }


        this.GetScooters = function () {
            return scootersModel.GetObjects();
        }

        this.GetScootersObj = function () {
            return scootersModel;
        }

        CopyObjects(vueModel.data, {
            stationsTotalNumber: 5,//_this.GetStations().length,
            stationsOnlineNumber: 5,//_this.GetStations().length,
            scooters : [],
            stations : [],
            balance : _this.balance.GetCurrentBalance(),
            balanceCurrency : _this.balance.GetBalanceCurrency(),
            power: _this.powers.GetPowerPerMonth(),
            slotsNumber: 20,
            slotsAvailableNumber : 10,
            slotsEmptyNumber : 5,
            scootersNumber : 20,
            scootersChargingNumber: 10,
            slotsLabel: 'AVAILABLE'
        });


    }

    DashboardComponent.prototype.Filter = function () {
        let countriesComponentObj = this.countriesComponentObj;

        let country = countriesComponentObj.GetCountry();
        let city = countriesComponentObj.GetCity();

        let scootersModel = this.GetScootersObj();
        let stationsModel = this.GetStationsModel();

        this.SetScooters(scootersModel.GetObjectsByCountryCityStatus(country, city, Scooter.Status.Charging));

        this.SetStations(stationsModel.GetObjectsByCountryCity(country, city));

        Charts.DrawPower(this.powers.GetPowersByLocation(country, city));
    }

    DashboardComponent.prototype.SetStations = function(stations) {
        this.model.data.stations = stations;

        this.CalcStationsBrief(stations, this.model.data);
    }

    DashboardComponent.prototype.CalcStationsBrief = function(stations, data) {
        if(typeof stations == "undefined" || typeof data == "undefined")
            return;

        data.stationsTotalNumber = stations.length;
        //data.stationsTotalNumber = stations.filter(s => s.);

        data.slotsNumber = stations.map(s => s.slots).reduce( (a, b) => a.concat(b)).length;

        data.slotsAvailableNumber = stations.map(s => s.slots.filter(s => s.status == Slot.Satatus.Available)).reduce( (a, b) => a.concat(b)).length;
    }

    DashboardComponent.prototype.SetScooters = function(scooters) {
        this.model.data.scooters = scooters;

        this.CalcScootersBrief(scooters, this.model.data)
    }

    DashboardComponent.prototype.CalcScootersBrief = function(scooters, data) {
        if(typeof scooters == "undefined" || typeof data == "undefined")
            return;

        let s = scooters;

        data.scootersNumber = s.length;
        // data.scootersGrantedNumber = scooters.filter(x => x.permission == Scooter.Permission.Granted).length;
        // data.scootersDeniedNumber = scooters.filter(x => x.permission == Scooter.Permission.Denied).length;
        data.scootersChargingNumber = scooters.filter(x => x.status == Scooter.Status.Charging).length;
        //data.scootersOfflineNumber = scooters.filter(x => x.status == Scooter.Status.Offline).length;
    }

    return DashboardComponent;
})();