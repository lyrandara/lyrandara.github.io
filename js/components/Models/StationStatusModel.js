let StationStatusModel = (function(){
    function StatusModel() {
    };

    StatusModel.prototype.GetInfos = function () {
        return ["All", "Online", "Offline"];
    }

    StatusModel.prototype.GetStatuses = function () {
        return ["All", "Occupied", "Available", "Unavailable", "Online", "Offline"];
    }


    return StatusModel;
})();