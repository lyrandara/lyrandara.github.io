let MessageModel = (function () {
    function MessageModel(message, date) {
        this.message = message;
        if(typeof date == "string") {
            this.date = DateTimeParser.FromString(date);
        }
        else
            this.date = date;
    }

    Object.defineProperty(MessageModel.prototype, "GetDateString", {
        get() {
            return DateTimeParser.ToStringByFormat(this.date, 'DD MMM');
        }
    });

    return MessageModel;
})();