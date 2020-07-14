let ResponsiveMessages = (function () {
    let $ = jQuery;

    function Update() {

        //let hSize = 0;
        let hSize = CalcElements.CalcPaddingTopBottom($('.card-body'));

        $('.messages > div > .row').each(function(index) {
            if(index != 3) {
                hSize += $(this).height();
            }

            //Log.trace($(this).height());
        });

        let sz = window.innerHeight - hSize - 2;

        $('.questions-block').height(sz);

        return sz;
    }

    function ResponsiveMessages() {
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

        this.timer = setInterval(()=> {
            let newSz = LocalUpdate();
            if(newSz != 0 && newSz == sz)
            {
                clearInterval(this.timer);
            }
            sz = newSz;
        }, 100);

        this.Update = Update;
    }

    return ResponsiveMessages;
})();
