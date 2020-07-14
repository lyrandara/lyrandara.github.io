
let ScootersComponent = (function () {

    let statusComponent = StatusComponent(new ScooterStatusModel());

    function ScootersComponent(vueModel, defCountryCity, countries) {
        let _this = this;


        if(typeof defCountryCity == "undefined")
            defCountryCity = {};

        countries = countries || new CountriesModel();
        let countriesComponent = CountriesComponent(countries);
        let scootersObj = new Scooters();

        this.GetScooters = function () {
            return scootersObj.GetObjects();
        }

        this.GetScootersObj = function () {
            return scootersObj;
        }

        VueModelInitial(vueModel);

        let countriesComponentObj = new countriesComponent(vueModel, defCountryCity.country, defCountryCity.city);
        let statusComponentObj = new statusComponent(vueModel);

        this.countriesComponentObj = countriesComponentObj;
        this.statusComponentObj = statusComponentObj;

        this.CalcScootersBrief(_this.GetScooters(), vueModel.data);

        CopyObjects(vueModel.data, {
            scooters: _this.GetScooters()
        });

        countriesComponentObj.Callback = function (country, city) {
            _this.Filter();
        }

        statusComponentObj.Callback = function (inStatus) {
            _this.Filter();
        }

        this.model = vueModel;
    }

    ScootersComponent.prototype.Filter = function()
    {
        let statusComponentObj = this.statusComponentObj;

        let inStatus = statusComponentObj.GetStatus();

        if(typeof inStatus == "undefined")
            return;

        let countriesComponentObj = this.countriesComponentObj;

        let scooters = this.GetScootersObj();

        let country = countriesComponentObj.GetCountry();
        let city = countriesComponentObj.GetCity();

        this.SetScooters(scooters.GetObjectsByCountryCityStatus(country, city, inStatus));
    }

    ScootersComponent.prototype.SetScooters = function(scooters) {
        this.model.data.scooters = scooters;

        this.CalcScootersBrief(scooters, this.model.data)
    }

    ScootersComponent.prototype.CalcScootersBrief = function(scooters, data) {
        if(typeof scooters == "undefined" || typeof data == "undefined")
            return;

        let s = scooters;

        data.scootersNumber = s.length;
        data.scootersGrantedNumber = scooters.filter(x => x.permission == Scooter.Permission.Granted).length;
        data.scootersDeniedNumber = scooters.filter(x => x.permission == Scooter.Permission.Denied).length;
        data.scootersChargingNumber = scooters.filter(x => x.status == Scooter.Status.Charging).length;
        data.scootersOfflineNumber = scooters.filter(x => x.status == Scooter.Status.Offline || x.status == Scooter.Status.Charged).length;
    }

    return ScootersComponent;
})();
