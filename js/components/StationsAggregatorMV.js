
let StationsAggregatorMView = (function () {

  let StateType = Aggregator.StateType;

  function StationsAggregatorMView(vueModel) {
    let sAgg = this.stationsAggregator = new Aggregator(new StationsAggregator());

    if (typeof vueModel.data == "undefined")
      vueModel.data = {};

    if (typeof vueModel.methods == "undefined")
      vueModel.methods = {};

    CopyObjects(vueModel.data, {
      stationsAggregator: sAgg,
      stations: sAgg.GetObjects()
    });

    CopyObjects(vueModel.methods, {
      OnAddStation: function () {
        sAgg.AddModelEvent();
      },
      OnEditStation: function () {
        try {
          sAgg.EditModelEvent();
          ModalWindows.ShowStationModal();
        } catch (e) {
          ModalWindows.ShowError(e);
        }
      },
      OnStationsAggregatorSubmit() {
        try {
          let mode = sAgg.Mode;
          if (!sAgg.Submit())
            ModalWindows.HideStationModal();

          if (mode == StateType.Add) {
            ModalWindows.ShowSuccess("Station added");
          } else if (mode == StateType.Edit) {
            ModalWindows.ShowSuccess("Station updated");
          }
        } catch (e) {
          ModalWindows.ShowError("OnStationsAggregatorSubmit: " + e);
        }
      },
      OnDeleteStation() {
        sAgg.DeleteModel();
      },
      OnStationsAggregatorOnCheckClick(e) {
        sAgg.OnCheckClick(e);
      }
    });

    this.model = vueModel;
  }

  return StationsAggregatorMView;
})();
