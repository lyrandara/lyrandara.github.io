let LogsPresetsModel = (function(){
    const states = {
        LoginHistory: "Login History",
        ErrorLogs: "Error Logs",
        Warnings: "Warnings"
    }

    const actions = {
        Login: "LOGIN",
        Logout: "LOGOUT",
        Error: "ERROR",
        Warning: "WARNINGS"
    };

    const stateActions = {
        "Login History": [actions.Login, actions.Logout],
        "Error Logs": [actions.Error],
        "Warnings": [actions.Warning],
    };

    function LogsPresetsModel() {
    };

    LogsPresetsModel.prototype.GetStatuses = function () {
        let result = [];
        for(let i in states)
        {
            result.push(states[i]);
        }
        return result;
    }

    LogsPresetsModel.States = states;
    LogsPresetsModel.Actions = actions;
    LogsPresetsModel.CheckActionType = function(type, action) {
        return stateActions[type].indexOf(action) != -1;
    }

    return LogsPresetsModel;
})();