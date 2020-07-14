let SystemLogsComponent = (function () {

    let typesPresetsComponent = StatusComponent(new LogsPresetsModel());
    let dateRangeComponent = DateRangeComponent();

    let RangeStates = DateRangePresetsModel.States;

    const rangeNameDefault = RangeStates.ThisMonth;

    const logPresetDefault = LogsPresetsModel.States.LoginHistory;

    const paginatorMaxObjects = 5;

    function SystemLogsComponent(vueModel) {
        let _this = this;

        this.model = vueModel;

        VueModelInitial(vueModel);

        let dateRangeComponentObj = new dateRangeComponent(vueModel, rangeNameDefault);
        this.dateRangeComponentObj = dateRangeComponentObj;

        let systemLogsObj = new SystemLogs();

        this.GetRecords = function () {
            return systemLogsObj.GetObjects();
        }

        this.GetObj = function () {
            return systemLogsObj;
        }

        CopyObjects(vueModel.data, {
            systemLogs: _this.GetRecords()
        });

        let typesPresetsComponentObj = new typesPresetsComponent(vueModel, logPresetDefault);
        this.typesPresetsComponentObj = typesPresetsComponentObj;

        let paginatorObj = new PaginatorComponent(vueModel, paginatorMaxObjects);
        this.paginatorObj = paginatorObj;

        paginatorObj.Callback = (objs) => {
            this.SetRecords(objs);
        }

        dateRangeComponentObj.Callback = () => {
            _this.Filter();
        }

        typesPresetsComponentObj.Callback = (type) => {
            paginatorObj.SetPageNumber(1);
            _this.Filter();
        }

        vueModel.userInitsCallbacks.push(()=> {
            _this.Filter();
        });


    }

    SystemLogsComponent.prototype.Filter = function()
    {
        let dateRangeComponentObj = this.dateRangeComponentObj;

        let logsObj = this.GetObj();

        let start = dateRangeComponentObj.GetDateStart();
        let end = dateRangeComponentObj.GetDateEnd();

        let type = this.typesPresetsComponentObj.GetStatus();

        let logs = logsObj.GetObjectsByDateAndType(start, end, type);
        logs = this.paginatorObj.Filter(logs);

        this.SetRecords(logs);
    }

    SystemLogsComponent.prototype.SetRecords = function(logs) {
        this.model.data.systemLogs = logs;
    }

    return SystemLogsComponent;
})();
