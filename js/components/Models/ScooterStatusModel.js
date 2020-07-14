let ScooterStatusModel = (function(){
    function ScooterStatusModel() {
    };

    ScooterStatusModel.prototype.GetStatuses = function () {
        return ["All", "Charging", "Charged", "Not charging"];
    }

    return ScooterStatusModel;
})();