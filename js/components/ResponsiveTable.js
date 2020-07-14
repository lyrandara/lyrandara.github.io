let ResponsiveTable = (function () {
    let $ = jQuery;

    function CalcStage1(element) {
        if(element.length == 0)
            return 0;
        return  parseInt(element.css('margin-top')) + parseInt(element.css('margin-bottom') ) +
            parseInt(element.css('border-top-width') ) + parseInt(element.css('border-bottom-width') );
    }

    function CalcPaddingTopBottom(element) {
        if(element.length == 0)
            return 0;
        return  parseInt(element.css('padding-top')) + parseInt(element.css('padding-bottom') );
    }

    function CalcHeightOfElement(element)
    {
        if(element.length == 0)
            return 0;

        let sz = CalcStage1(element) + parseInt(element.css('height'));

//        Log.trace(sz);

        return sz;
    }

    function SetBgMinHeight(val) {
        if(typeof  val != "undefined") {
            $('.bg-1').css('min-height', val + 'px');
            $('.bg-2').css('min-height', val + 'px');
        }
    }

    function Update() {

        if($('#users-page').length > 0) {
            return;
        }

        if($('#billing-page').length > 0) {

            let hSize = CalcHeightOfElement($('.top-container'));
            hSize += CalcHeightOfElement($('.spacer'));
            hSize += CalcStage1($('#billing-page'));

            let sz = window.innerHeight - hSize;

            SetBgMinHeight(sz);
            return;
        }

        if($('#power-cost-page').length > 0 || $('#system-logs').length > 0) {

            let hSize = CalcHeightOfElement($('.top-container'));
            hSize += CalcHeightOfElement($('.spacer'));
            hSize += CalcHeightOfElement($('.card-header'));

            let sz = window.innerHeight - hSize;

            SetBgMinHeight(sz);
            return;
        }

        let hSize = CalcHeightOfElement($('.top-container'));
        hSize += CalcHeightOfElement($('.spacer'));
        hSize += CalcHeightOfElement($('.card-header'));
        hSize += CalcHeightOfElement($('.brief-info'));
        hSize += CalcPaddingTopBottom($('.card-body'));

        let sz = window.innerHeight - hSize;

        if(
            $('#stations-page').length > 0 ||
            $('#scooters-page').length > 0
        ) {
            SetBgMinHeight(sz);
            return;
        }

        $('.table-responsive').height(sz);

        return sz;
    }

    function ResponsiveTable() {
        let objThis = this;

        this.CallBack = function(){};

        function LocalUpdate()
        {
            objThis.CallBack(Update());
        }

        $(window).on('resize', ()=> {
            LocalUpdate();
        });
        LocalUpdate();

        let sz = 0;
        this.timer = setTimeout(()=> {
            let newSz = LocalUpdate();
            // if(newSz != 0 && newSz == sz)
            // {
            //     clearInterval(this.timer);
            // }
            // sz = newSz;

        }, 1000);

        this.Update = Update;
    }

    return ResponsiveTable;
})();
