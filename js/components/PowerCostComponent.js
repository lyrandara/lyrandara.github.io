
let PowerCostComponent = (function () {

    let dateRangeComponent = DateRangeComponent();

    let dateRangePresetsComponent = StatusComponent(new DateRangePresetsModel());

    let RangeStates = DateRangePresetsModel.States;

    const rangeNameDefault = RangeStates.LastMonth;

    function PowerCostComponent(vueModel, defCountryCity, countries, model) {
        let _this = this;

        this.model = vueModel;

        VueModelInitial(vueModel);

        let reportsObj = model || new Reports();

        if(typeof defCountryCity == "undefined")
            defCountryCity = {};

        let countriesComponent = CountriesComponent(countries || new CountriesModel());

        this.GetReportRecords = function () {
            return reportsObj.GetObjects();
        }

        this.GetReportsObj = function () {
            return reportsObj;
        }

        CopyObjects(vueModel.data, {
            reports: _this.GetReportRecords()
        });

        let countriesComponentObj = new countriesComponent(vueModel, defCountryCity.country, defCountryCity.city);
        let dateRangeComponentObj = new dateRangeComponent(vueModel, rangeNameDefault);

        countriesComponentObj.Callback = function (country, city) {
            _this.Filter();
        }

        dateRangeComponentObj.Callback = function (month, year) {
            _this.Filter();
        }

        let dateRangePresetsComponentObj = new dateRangePresetsComponent(vueModel, rangeNameDefault);

        dateRangePresetsComponentObj.Callback = (rangeName) => {
            dateRangeComponentObj.SetRangeState(rangeName);
            _this.Filter();
        }

        this.countriesComponentObj = countriesComponentObj;
        this.dateRangeComponentObj = dateRangeComponentObj;

        vueModel.userInitsCallbacks.push(()=> {
            _this.Filter();
        });
    }

    PowerCostComponent.prototype.Filter = function()
    {
        Log.trace("Filter");

        let countriesComponentObj = this.countriesComponentObj;
        let dateRangeComponentObj = this.dateRangeComponentObj;

        let reportsObj = this.GetReportsObj();

        //let country = countriesComponentObj.GetCountry();
        let city = countriesComponentObj.GetCity();

        let start = dateRangeComponentObj.GetDateStart();
        let end = dateRangeComponentObj.GetDateEnd();

        this.SetReports(reportsObj.GetObjectsByCityAndDate(city, start, end));
    }

    PowerCostComponent.prototype.SetReports = function(reports) {
        this.model.data.reports = reports;
    }

    return PowerCostComponent;
})();
