let PadsComponent = (function () {
    function PadsComponent(vueModel) {
        let _this = this;

        this.model = vueModel;
        this.CallBack = function() {};

        VueModelInitial(vueModel);

        CopyObjects(vueModel.data, {
            pads: []
        });

        CopyObjects(vueModel.methods, {
            OnNewPad() {
                _this.model.data.pads.push(Slot.Default());
            },
            OnDeletePad() {
                _this.model.data.pads = _this.model.data.pads.filter( p => !p.selected);
            }
        });
    }

    PadsComponent.prototype.GetPads = function() {
        return this.model.data.pads;
    }

    PadsComponent.prototype.ResetPads = function() {
        this.model.data.pads = [];
    }

    PadsComponent.prototype.LoadPads = function(pads) {
        this.model.data.pads = pads.map(x=> x.Clone());
    }

    return PadsComponent;
})();

