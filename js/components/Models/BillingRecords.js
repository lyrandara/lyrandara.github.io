function Billing(id,date,type,totalPower,totalTime,totalPrice,location) {
    this.id = id;

    if(typeof date == "string") {
        this.date = DateTimeParser.FromString(date);
    }
    else
        this.date = date;

    this.type = type;
    this.totalPower = totalPower;
    this.totalTime = totalTime;
    this.totalPrice = totalPrice;
    this.location = location;
}

Object.defineProperty(Billing.prototype, "getDateString", {
    get() {
        return DateTimeParser.ToString(this.date);
    }
});


Billing.Type = {
    Invoice : "Invoice"
};

let BillingRecords = (function () {

    function BillingRecords() {
        // this.billingRecords = [
        //     new Billing(789064, "05.05.2020", Billing.Type.Invoice, "566", "32 h 30 min", 63,
        //         new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/")),
        //     new Billing(789064, "08.05.2020", Billing.Type.Invoice, "1678", "78 h 32 min", 600,
        //         new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/")),
        //     new Billing(789064, "06.05.2020", Billing.Type.Invoice, "137", "12 h 21 min", 521,
        //         new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/")),
        //     new Billing(789064, "07.05.2020", Billing.Type.Invoice, "16", "74 h 30 min", 345,
        //         new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/")),
        //     new Billing(789064, "01.02.2020", Billing.Type.Invoice, "1", "63 h 30 min", 678,
        //         new Location("Latvia", "Valmiera", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/")),
        //     new Billing(789064, "14.02.2020", Billing.Type.Invoice, "600", "10 h 21 min", 230,
        //         new Location("Ukraine", "Kiev", "Pushkin street 34-3", "https://www.google.ru/maps/@50.4339847,30.5316211,11.67z")),
        //     new Billing(789064, "01.05.2020", Billing.Type.Invoice, "14", "70 h 32 min", 121,
        //         new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/")),
        //     new Billing(789064, "02.05.2019", Billing.Type.Invoice, "13", "81 h 37 min", 320,
        //         new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/")),
        //     new Billing(789064, "04.01.2017", Billing.Type.Invoice, "20", "82 h 40 min", 163,
        //         new Location("Latvia", "Riga", "Elinos 34-3", "https://www.google.ru/maps/place/@56.8509021,24.1430431,9z/")),
        // ];

        this.billingRecords = [
            new Billing(789064, "30.05.2020", Billing.Type.Invoice, "960", "2400",   420, new Location("Israel", "Tel Aviv", "HaCarmel St 48", [32.068683,34.7668583]))
            // new Billing(922, "05.05.2020", Billing.Type.Invoice, "206", "9 h 9 min",   83,                new Location("Israel", "Tel Aviv", "HaCarmel St 48", [32.068683,34.7668583])),
            // new Billing(960, "06.05.2020", Billing.Type.Invoice, "923", "19 h 21 min", 57,                new Location("Israel", "Tel Aviv", "HaCarmel St 48", [32.068683,34.7668583])),
            // new Billing(14,  "07.05.2020", Billing.Type.Invoice, "786", "12 h 30 min", 63,                new Location("Israel", "Tel Aviv", "HaCarmel St 48", [32.068683,34.7668583])),
            // new Billing(719, "09.05.2020", Billing.Type.Invoice, "328", "1 h 19 min",  82,                new Location("Israel", "Tel Aviv", "HaCarmel St 48", [32.068683,34.7668583])),
            // new Billing(894, "10.05.2020", Billing.Type.Invoice, "135", "8 h 11 min",  43,                new Location("Israel", "Tel Aviv", "HaCarmel St 48", [32.068683,34.7668583])),
            // new Billing(105, "11.05.2020", Billing.Type.Invoice, "876", "19 h 3 min",  94,                new Location("Israel", "Tel Aviv", "HaCarmel St 48", [32.068683,34.7668583])),
            // new Billing(930, "12.05.2020", Billing.Type.Invoice, "800", "11 h 2 min",  18,                new Location("Israel", "Tel Aviv", "Ahad Ha'Am St 43", [32.0655783,34.7735893])),
            // new Billing(506, "13.05.2020", Billing.Type.Invoice, "319", "16 h 9 min",  100,                new Location("Israel", "Tel Aviv", "HaCarmel St 48", [32.068683,34.7668583])),
            // new Billing(304, "14.05.2020", Billing.Type.Invoice, "794", "3 h 3 min",   31,                new Location("Israel", "Tel Aviv", "Tarsat Ave 2", [32.0725914,34.7767774])),
            // new Billing(389, "15.05.2020", Billing.Type.Invoice, "989", "2 h 11 min",  59,                new Location("Israel", "Tel Aviv", "HaGdud Haivri St 8", [32.0603079,34.7727862]))
        ]
    }

    BillingRecords.prototype.GetObjects = function () {
        return this.billingRecords;
    }

    BillingRecords.prototype.GetObjectsByCountryCityTime = function(country, city, month, year) {

        let billings = this.GetObjects();

        if(country != "All") {
            billings = billings.filter(x => x.location.country == country);
        }

        if(city != "All") {
            billings = billings.filter(x => x.location.city == city);
        }

        if(month != "All") {
            let monthIndex = DateTimeParser.GetMonthIndex(month);
            if(monthIndex != 0) {
                billings = billings.filter(x =>x.date.month == monthIndex);
            }
        }

        if(year != "All") {
            year = parseInt(year);
            billings = billings.filter(x =>x.date.year == year);
        }

        return billings;
    }

    return BillingRecords;
})();