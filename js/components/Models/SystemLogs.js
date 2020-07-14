function SystemLogModel(date, action, ipAddr) {
    if(typeof date == "string") {
        this.date = DateTimeParser.FromString(date);
    }
    else
        this.date = date;

    this.action = action;
    this.ipAddr = ipAddr;
}

Object.defineProperty(SystemLogModel.prototype, "GetDateString", {
    get() {
        return DateTimeParser.ToString(this.date, '/');
    }
});

let SystemLogs = (function () {
    const actions = LogsPresetsModel.Actions;

    function SystemLogs() {
        this.objs = [
            new SystemLogModel("07/04/2020 14:20", actions.Login, "91.255.198.151"),
            new SystemLogModel("07/04/2020 14:21", actions.Login, "91.255.198.151"),
            new SystemLogModel("07/04/2020 14:22", actions.Login, "91.255.198.151"),
            new SystemLogModel("01/06/2020 15:23", actions.Logout, "91.255.198.151"),
            new SystemLogModel("02/06/2020 9:24:04", actions.Login, "91.255.198.151"),
            new SystemLogModel("03/06/2020 17:25", actions.Error, "91.255.198.151"),
            new SystemLogModel("25/05/2020 17:26", actions.Error, "91.255.198.151"),
            new SystemLogModel("03/06/2020 17:27", actions.Error, "91.255.198.151"),
            new SystemLogModel("03/06/2020 17:28", actions.Error, "91.255.198.151"),
            new SystemLogModel("03/06/2020 17:29", actions.Error, "91.255.198.151"),
            new SystemLogModel("03/06/2020 17:30", actions.Error, "91.255.198.151"),
            new SystemLogModel("03/06/2020 17:31", actions.Error, "91.255.198.151"),
            new SystemLogModel("03/06/2020 17:32", actions.Error, "91.255.198.151"),
            new SystemLogModel("03/06/2020 17:33", actions.Error, "91.255.198.151"),
            new SystemLogModel("03/06/2020 17:34", actions.Error, "91.255.198.151"),
            new SystemLogModel("03/06/2020 17:35", actions.Error, "91.255.198.151"),
            new SystemLogModel("02/06/2020 14:26", actions.Warning, "91.255.198.151"),
            new SystemLogModel("02/06/2020 14:27", actions.Warning, "91.255.198.152"),
            new SystemLogModel("02/06/2020 14:28", actions.Warning, "91.255.198.153"),
            new SystemLogModel("02/06/2020 14:29", actions.Warning, "91.255.198.154"),
            new SystemLogModel("02/06/2020 14:30", actions.Warning, "91.255.198.155"),
            new SystemLogModel("02/06/2020 14:31", actions.Warning, "91.255.198.156"),
            new SystemLogModel("02/06/2020 14:32", actions.Warning, "91.255.198.157"),
            new SystemLogModel("02/06/2020 14:33", actions.Warning, "91.255.198.158"),
            new SystemLogModel("02/06/2020 14:34", actions.Warning, "91.255.198.159"),
            new SystemLogModel("02/06/2020 14:35", actions.Warning, "91.255.198.160"),
        ];
    }

    SystemLogs.prototype.GetObjects = function () {
        return this.objs;
    }

    SystemLogs.prototype.GetObjectsByDateAndType = function(start, end, type) {
        let objs = this.GetObjects();

        // for (let ob in objs) {
        //     Log.trace(objs[ob].date);
        // }

        objs = objs.filter(x => DateTimeParser.InRangeDate(start, end, x.date));

        objs = objs.filter(x => LogsPresetsModel.CheckActionType(type, x.action));

        return objs;
    }

    return SystemLogs;
})();