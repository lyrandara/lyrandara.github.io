let Balance = (function () {

    let costsData = [20, 25, 27, 52, 79, 131, 140, 135, 70, 20, 5, 1];

    const Currencies = {
        Dollar : "$",
        Bitcoin : "BTC"
    };

    function Balance() {

    }

    Balance.prototype.GetCurrentBalance = function () {
        return 100;
    }

    Balance.prototype.GetBalanceCurrency = function () {
        return Currencies.Dollar;
    }

    Balance.prototype.GetСostsPerMonth = function () {
        return costsData;
    }

    return Balance;
})();