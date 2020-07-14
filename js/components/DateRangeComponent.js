let DateRangeComponent = function () {
    const delim = "/";

    let countries = new CountriesModel();

    let RangeStates = DateRangePresetsModel.States;

    function AfterInitVue(vue){
        let format = 'DD/MM/YYYY';
        let pikerConfig = {
            singleDatePicker: true,
            locale: {
                format:format
            }
        };

        $('#date-range-start').daterangepicker(pikerConfig).on('change', function(event) {
            vue.dateRangeStartSelector = this.value;
        });
        $('#date-range-end').daterangepicker(pikerConfig).on('change', function(event) {
            vue.dateRangeEndSelector = this.value;
        });
    }

    function DateRangeComponent(vueModel, rangeNameDefault) {
        let $this = this;

        this.model = vueModel;

        rangeNameDefault = rangeNameDefault || RangeStates.ThisMonth;

        this.Callback = function(country, city){};

        VueModelInitial(vueModel);

        CopyObjects(vueModel.data, {
            dateRangeStartSelector: "",
            dateRangeEndSelector : ""
        });

        this.SetRangeState(rangeNameDefault);

        CopyObjects(vueModel.watch, {
            dateRangeStartSelector: function (startDate, oldVal) {
                $this.Callback(startDate, vueModel.data.dateRangeEndSelector);
            },
            dateRangeEndSelector: function (endDate, oldVal) {
                $this.Callback(vueModel.data.dateRangeStartSelector, endDate);
            }
        });

        vueModel.userInitsCallbacks.push(AfterInitVue);
    }

    DateRangeComponent.prototype.GetDateStart = function() {
        let vueModel = this.model;
        return DateTimeParser.FromString(vueModel.data.dateRangeStartSelector);
    }

    DateRangeComponent.prototype.GetDateEnd = function() {
        let vueModel = this.model;
        return DateTimeParser.FromString(vueModel.data.dateRangeEndSelector);
    }

    DateRangeComponent.prototype.SetDateStart = function(date) {
        let vueModel = this.model;
        vueModel.data.dateRangeStartSelector = DateTimeParser.ToString(date, delim);
    }

    DateRangeComponent.prototype.SetDateEnd = function(date) {
        let vueModel = this.model;
        vueModel.data.dateRangeEndSelector = DateTimeParser.ToString(date, delim);
    }

    DateRangeComponent.prototype.SetLastWeek = function() {
        let dateRangeComponentObj = this;

        let obj = moment().subtract(1, 'weeks').startOf('isoWeek');

        dateRangeComponentObj.SetDateStart({
            year : obj.year(),
            month: obj.month() + 1,
            day: obj.date()
        });

        dateRangeComponentObj.SetDateEnd({
            year : obj.year(),
            month: obj.month() + 1,
            day: obj.add(6, "days").date()
        });
    }

    DateRangeComponent.prototype.SetThisWeek = function() {
        let dateRangeComponentObj = this;

        let obj = moment().startOf('isoWeek');

        dateRangeComponentObj.SetDateStart({
            year : obj.year(),
            month: obj.month() + 1,
            day: obj.date()
        });

        dateRangeComponentObj.SetDateEnd({
            year : obj.year(),
            month: obj.month() + 1,
            day: moment().date()
        });
    }

    DateRangeComponent.prototype.SetLastMonth = function() {
        let dateRangeComponentObj = this;

        let obj = moment().subtract(1, 'months');

        dateRangeComponentObj.SetDateStart({
            year : obj.year(),
            month: obj.month() + 1,
            day: 1
        });

        dateRangeComponentObj.SetDateEnd({
            year : obj.year(),
            month: obj.month() + 1,
            day: obj.endOf('month').date()
        });
    }

    DateRangeComponent.prototype.SetThisMonth = function() {

        let dt = new Date();

        let dateRangeComponentObj = this;

        dateRangeComponentObj.SetDateStart({
            year : dt.getFullYear(),
            month: dt.getMonth() + 1,
            day: 1
        });

        dateRangeComponentObj.SetDateEnd({
            year : dt.getFullYear(),
            month: dt.getMonth() + 1,
            day: dt.getDate()
        });
    }

    DateRangeComponent.prototype.SetRangeState = function(rangeName){
        let dateRangeComponentObj = this;
        this.rangeState = rangeName;

        //Log.trace(rangeName);

        switch (rangeName) {
            case RangeStates.LastMonth:
            {
                dateRangeComponentObj.SetLastMonth();

                break;
            }
            case RangeStates.ThisMonth: {

                dateRangeComponentObj.SetThisMonth();

                break;
            }
            case RangeStates.LastWeek: {

                dateRangeComponentObj.SetLastWeek();

                break;
            }
            case RangeStates.ThisWeek: {

                dateRangeComponentObj.SetThisWeek();

                break;
            }

            default:{}
        }
    }

    return DateRangeComponent;
};