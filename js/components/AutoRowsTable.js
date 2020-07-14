let AutoRowsTable = (function () {
    const $ = jQuery;

    let tableMainSelector = () => $('.table-auto-rows');
    let tableContainerSelector = () => $('.table-auto-rows .table-responsive');
    let tableRowsHeight = () => {
        let t = tableContainerSelector().find('table');
        return t.height() - t.find('> thead').height();
    }

    let tableFooterSelector = () => $('.auto-rows-footer');

    let bodyRect = document.body.getBoundingClientRect();

    function AutoRowsTable(paginator) {

        if(tableMainSelector().length == 0)
            return;

        if(typeof paginator != "object" ||
            !CheckObjFields(paginator, ["SetMaxPageObjects", "GetMaxPageObjects"]))
            return;

        this.paginator = paginator;

        this.Init();
    }

    AutoRowsTable.prototype.Init = function() {
        this.count = this.paginator.GetMaxPageObjects();
        this.rowHeight = tableRowsHeight() / this.paginator.GetMaxPageObjects();
        this.footerHeight = tableFooterSelector().height();

        //Log.trace("rowHeight = " + this.rowHeight);
    }

    AutoRowsTable.prototype.UpdateMaxPageObjects = function() {
        let p = this.paginator;
        if(typeof p == "undefined")
            return;

        let h = window.innerHeight - tableMainSelector()[0].getBoundingClientRect().top - bodyRect.top - this.footerHeight
            - parseInt(tableContainerSelector().css('padding-bottom')) - parseInt(tableContainerSelector().css('padding-top'))
            - tableContainerSelector().find('table > thead').height();

        let newPageObjects = Math.floor( h / this.rowHeight );

        // Log.trace(newPageObjects);
        // Log.trace(h);

        if(newPageObjects != NaN)
        {
            p.SetMaxPageObjects(newPageObjects);
        }
    }

    return AutoRowsTable;
})();