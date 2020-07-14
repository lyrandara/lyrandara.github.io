let IncomingMessages = (function () {
    function IncomingMessages() {
        this.objs = [
            new MessageModel("RE: Question1", "25/05/2020"),
            new MessageModel("RE: Question2", "25/05/2020"),
            new MessageModel("RE: Question3", "25/05/2020"),
            new MessageModel("RE: Question4", "25/05/2020"),
            new MessageModel("RE: Question5", "25/05/2020"),
            new MessageModel("RE: Question6", "25/05/2020"),
            new MessageModel("RE: Question7", "25/05/2020"),
            new MessageModel("RE: Question8", "10/05/2020"),
            new MessageModel("RE: Question9", "11/05/2020"),
            new MessageModel("RE: Question10", "12/05/2020"),
            new MessageModel("RE: Question11", "13/05/2020"),
            new MessageModel("RE: Question12", "14/05/2020"),
            new MessageModel("RE: Question13", "15/05/2020"),
            new MessageModel("RE: Question14", "16/05/2020"),
            new MessageModel("RE: Question15", "17/05/2020"),
        ];
    }

    IncomingMessages.prototype.GetObjects = function () {
        return this.objs;
    }

    return IncomingMessages;
})();