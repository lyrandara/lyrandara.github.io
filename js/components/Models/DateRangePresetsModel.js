let DateRangePresetsModel = (function(){
    const states = {
        LastMonth: "Last month", ThisMonth : "This month", LastWeek: "Last week", ThisWeek: "This week", All : "All"
    }

    function DateRangePresetsModel() {
    };

    DateRangePresetsModel.prototype.GetStatuses = function () {
        let result = [];
        for(let i in states)
        {
            if(i != states.All)
            result.push(states[i]);
        }
        return result;
    }

    DateRangePresetsModel.prototype.GetStatusesDisables = function () {
        return [false, true, true, true, true];
    }

    DateRangePresetsModel.States = states;

    return DateRangePresetsModel;
})();