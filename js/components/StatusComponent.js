let StatusComponent = function (status) {

    function StatusComponent(vueModel, defaultValue) {
        if(typeof vueModel == "undefined")
            return;

        if(typeof status == "undefined")
            return;

        let $this = this;

        let statuses = status.GetStatuses();

        this.Callback = function(status){};

        let countriesNames = [];

        VueModelInitial(vueModel);

        defaultValue = defaultValue || statuses[0];

        let defaultStatus = statuses.length == 0 ? "-" : defaultValue;

        CopyObjects(vueModel.data, {
            statuses: statuses,
            statusesEnables: typeof status.GetStatusesDisables != "undefined" ? status.GetStatusesDisables() : [],
            statusSelector: defaultStatus
        });

        let currentStatus = defaultStatus;

        CopyObjects(vueModel.watch, {
            statusSelector: function (status, oldVal) {
                currentStatus = status;
                $this.Callback(status);
            }
        });

        this.model = vueModel;

        this.GetStatus = function () {
            return currentStatus;
        }
    }

    return StatusComponent;
};