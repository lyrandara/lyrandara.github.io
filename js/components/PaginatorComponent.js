let PaginatorComponent = (function () {

    function Calc($this, objs) {
        $this.objs = objs;

        let data = $this.model.data;

        let maxObjects = data.pageMaxObjects;

        let pNum = Math.ceil(objs.length / maxObjects);

        if(pNum <= 0)
            pNum = 1;

        data.pageMaxNumber = pNum;

        let pageIndex = (data.pageNumber - 1) * maxObjects;

        return objs.slice(pageIndex, pageIndex + maxObjects);
    }
    
    function PaginatorComponent(vueModel, maxObjects) {
        maxObjects = maxObjects || 5;

        let _this = this;

        this.Callback = function(objs){};

        this.model = vueModel;

        VueModelInitial(vueModel);

        this.objs = [];

        CopyObjects(vueModel.data, {
            pageNumber: 1,
            pageMaxNumber: 1,
            pageMaxObjects: maxObjects
        });

        CopyObjects(vueModel.methods, {
            NextPage(){
                if(vueModel.data.pageNumber < vueModel.data.pageMaxNumber)
                    ++vueModel.data.pageNumber;
            },
            PrevPage(){
                if(vueModel.data.pageNumber > 1)
                    --vueModel.data.pageNumber;
            }
        })

        CopyObjects(vueModel.watch, {
            pageMaxObjects: function (val, oldVal) {

                _this.Callback(Calc(_this, _this.objs));
            },
            pageNumber: function (val, oldVal) {

                _this.Callback(Calc(_this, _this.objs));
            },
            pageMaxNumber: function (val, oldVal) {
                if(this.pageNumber > this.pageMaxNumber)
                    this.pageNumber = this.pageMaxNumber;
            }
        });
    }

    PaginatorComponent.prototype.Filter = function (objs) {
        if(typeof objs == "object")
            return Calc(this, objs);

        return [];
    }

    PaginatorComponent.prototype.SetPageNumber = function (number) {
        if(typeof number == "number")
            this.model.data.pageNumber = number;
    }

    PaginatorComponent.prototype.SetMaxPageObjects = function (maxObjs) {
        if(typeof maxObjs == "number") {
            maxObjs = maxObjs > 0 ? maxObjs : 1;
            this.model.data.pageMaxObjects = maxObjs;
        }
    }

    PaginatorComponent.prototype.GetMaxPageObjects = function () {
        return this.model.data.pageMaxObjects;
    }
    
    return PaginatorComponent;
})();