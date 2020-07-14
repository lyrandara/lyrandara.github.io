let MessagesComponent = (function () {

    const paginatorMaxObjects = 12;

    function MessagesComponent(vueModel, modelObjs) {

        if(typeof modelObjs == "undefined")
            return;

        let _this = this;

        this.model = vueModel;

        VueModelInitial(vueModel);

        this.GetObjs = function () {
            return modelObjs.GetObjects();
        }

        this.GetObj = function () {
            return modelObjs;
        }

        let objs =  _this.GetObjs();

        CopyObjects(vueModel.data, {
            messages: objs,
            messagesTotal: objs.length
        });

        let paginatorObj = new PaginatorComponent(vueModel, paginatorMaxObjects);
        this.paginatorObj = paginatorObj;

        paginatorObj.Callback = (objs) => {
            this.SetRecords(objs);
        }

        vueModel.userInitsCallbacks.push(()=> {
            _this.Filter();
        });
    }

    MessagesComponent.prototype.Filter = function()
    {
        let objs = this.GetObjs();
        objs = this.paginatorObj.Filter(objs);

        this.SetRecords(objs);
    }

    MessagesComponent.prototype.SetRecords = function(objs) {
        this.model.data.messages = objs;
    }

    return MessagesComponent;
})();