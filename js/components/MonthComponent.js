let MonthComponent = function () {

    const defaultValue = 'All';

    const months = DateTimeParser.GetMonths();

    let years = [
        "All"
    ];

    for (let i = new Date().getFullYear(); i >= 2000; --i) {
        years.push(i.toString());
    }

    function Init($this) {
        jQuery('.select2').select2().on('change', function () {
            let obj = jQuery(this);
            if(obj.attr('id').search("month") != -1)
            {
                $this.model.data.monthSelector = obj.val();
                //Log.trace('city');
            }
            else if(obj.attr('id').search("year") != -1)
            {
                $this.model.data.yearSelector = obj.val();
                //Log.trace('country');
            }
        });
    }

    function MonthComponent(vueModel, defaultMonth, defaultYear) {
        let $this = this;

        defaultMonth = defaultMonth || defaultValue;
        defaultYear = defaultYear || defaultValue;

        this.model = vueModel;

        this.Callback = function(month, year){};

        VueModelInitial(vueModel);

        CopyObjects(vueModel.data, {
            months: months,
            monthSelector: defaultMonth,
            years: years,
            yearSelector: defaultYear
        });

        let currentMonth = defaultMonth;
        let currentYear = defaultYear;

        CopyObjects(vueModel.watch, {
            monthSelector: function (month, oldVal) {
                currentMonth = month.trim();
                $this.Callback(month, currentYear);
            },
            yearSelector : function (year, oldVal) {
                currentYear = year.trim();
                $this.Callback(currentMonth, year);
            }
        });

        this.GetMonth = function () {
            return currentMonth;
        }

        this.GetYear = function () {
            return currentYear;
        }

        vueModel.AddInitCallback(function () {
            Init($this);
        })
    }

    return MonthComponent;
};