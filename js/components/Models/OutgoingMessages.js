let OutgoingMessages = (function () {
    function OutgoingMessages() {
        this.objs = [
            new MessageModel("RE: OUT question1", "25/05/2020"),
            new MessageModel("RE: OUT question2", "25/05/2020"),
            new MessageModel("RE: OUT question3", "25/05/2020"),
            new MessageModel("RE: OUT question4", "25/05/2020"),
            new MessageModel("RE: OUT question5", "25/05/2020"),
            new MessageModel("RE: OUT question6", "25/05/2020"),
            new MessageModel("RE: OUT question7", "25/05/2020"),
            new MessageModel("RE: OUT question8", "10/05/2020"),
            new MessageModel("RE: OUT question9", "11/05/2020"),
            new MessageModel("RE: OUT question10", "12/05/2020"),
            new MessageModel("RE: OUT question11", "13/05/2020"),
            new MessageModel("RE: OUT question12", "14/05/2020"),
            new MessageModel("RE: OUT question13", "15/05/2020"),
            new MessageModel("RE: OUT question14", "16/05/2020"),
            new MessageModel("RE: OUT question15", "17/05/2020"),
        ];
    }

    OutgoingMessages.prototype.GetObjects = function () {
        return this.objs;
    }

    return OutgoingMessages;
})();