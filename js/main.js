let developMode = true;

let app;

/* Exts functions */
//let ArrayExt =
// (function(){
//
// })();

let Log = {
  trace(msg) {
    if (developMode)
      console.log(msg);
  },
  error(msg) {
    if (developMode)
      console.error(msg);
  }
};

Array.prototype.removeItem = function (i) {
  if (i != -1) {
    this.splice(i, 1);
  }
}

Array.prototype.removeObj = function (obj) {
  var i = this.indexOf(obj);
  if (i != -1) {
    this.splice(i, 1);
  }
}

// Station //
function Station() {
  let args = Array.from(arguments);

  this.m_selected = false;

  this.stationId = args[0];
  this.name = args[1];
  this.totalSlots = args[2];
  this.remainSlots = args[3];
  this.totalPower = args[4];
  this.currentPower = args[5];
  this.location = args[6];
  this.status = args[7];  // 1 - ok, 0 - disabled, -1  - error

  this.OnClick = typeof args[8] == "undefined" ? function () {
  } : args[8];
}

Object.defineProperty(Station.prototype, "selected", {
  get() {
    return this.m_selected;
  },
  set(val) {
    this.m_selected = val;
    this.OnClick(this);
  }
});

Object.defineProperty(Station.prototype, "GetStatusClass", {
  get: function () {
    if (this.status == 0) return "text-secondary";
    else if (this.status == 1) return "text-success";
    else if (this.status == -1) return "text-danger";
    else return "text-secondary";
  }
});
// end Station //

// Factory //
let Factory = {
  CreateDefaultStation() {
    return new Station("", "", "", "", "", "", "", 0);
  }
};
// end Factory //

// StationsAggregator //
let StationsAggregator = (function () {
  const StateType = Object.freeze({"None": 0, "Add": 1, "Edit": 2});
  const StatusType = Object.freeze({"Error": -1, "Disabled": 0, "Enabled": 1});
  const titles = ["default", "Add station", "Update station"];

  let shifted = false;

  jQuery(document).on('keyup keydown', function (e) {
    shifted = e.shiftKey
  });

  function StationsAggregator() {

    this.stations = [
      new Station(1, "Station 1", 10, 2, 100000, 80, "Station 1 location", StatusType.Error),
      new Station(2, "Station 2", 5, 1, 22133, 75, "Station 2 location", StatusType.Disabled),
      new Station(3, "Station 3", 7, 3, 1020, 70, "Station 3 location", StatusType.Enabled),
      new Station(3, "Station 4", 8, 4, 1020, 70, "Station 4 location", StatusType.Enabled),
      new Station(3, "Station 5", 9, 5, 1020, 70, "Station 5 location", StatusType.Enabled)
    ];

    this.CreateDefaultModel();

    //this.title = "default";
    this.Mode = StateType.None;

    this.selectedIndex = -1;

    this.noHide = false;
    this.selectAll = false;
  }

  Object.defineProperty(StationsAggregator, "StateType", {
    get() {
      return StateType;
    }
  });

  Object.defineProperty(StationsAggregator.prototype, "SelectAll", {
    get() {
      return this.selectAll;
    },
    set(val)
    {
      this.selectAll = val;

      this.stations.forEach(function (obj, index) {
        obj.selected = val;
      });
    }
  });

  Object.defineProperty(StationsAggregator.prototype, "SelectedIndex", {
    set(index) {
      if (index < 0) {
        this.selectedIndex = -1;
        throw "Selecting error";
      }

      this.selectedIndex = index;
    },
    get() {
      if (this.selectedIndex < 0)
        throw "Selecting error";

      return this.selectedIndex;
    }
  });

  Object.defineProperty(StationsAggregator.prototype, "Mode", {
    get() {
      return this.mode;
    },
    set(val) {
      this.mode = val;
      if (isNaN(val) || val >= titles.length)
        this.title = titles[StateType.None];
      else
        this.title = titles[val];
    }
  });

  StationsAggregator.prototype.CreateDefaultModel = function () {
    this.defaultModel = Factory.CreateDefaultStation();
  }

  StationsAggregator.prototype.GetStations = function () {
    return this.stations;
  }

  StationsAggregator.prototype.GetDefaultModel = function () {
    return this.defaultModel;
  }

  StationsAggregator.prototype.AddModelEvent = function () {
    this.Mode = StateType.Add;
    this.CreateDefaultModel();
  }

  StationsAggregator.prototype.EditModelEvent = function () {
    this.Mode = StateType.Edit;

    try {
      let sTuple = this.GetSelectedModel();

      Log.trace(sTuple.index);

      let s = sTuple.obj;

      this.defaultModel = new Station(s.stationId, s.name, s.totalSlots, s.remainSlots
        , s.totalPower, s.currentPower, s.location, s.status);

      return true;
    } catch (e) {
      // dialog box
      Log.error(e);
      throw e;
    }

    return false;
  }

  StationsAggregator.prototype.Submit = function () {

    let dModel = this.defaultModel;

    Log.trace("Mode " + this.Mode);

    if (this.Mode == StateType.Add) {

      this.stations.push(new Station(dModel.stationId, dModel.name, dModel.totalSlots, dModel.remainSlots
        , dModel.totalPower, dModel.currentPower, dModel.location, dModel.status));

      return this.noHide;
    } else if (this.Mode == StateType.Edit) {

      try {

        let index = this.SelectedIndex;

        Log.trace(index);

        this.stations.removeItem(index);
        this.stations.splice(index, 0, new Station(dModel.stationId, dModel.name, dModel.totalSlots, dModel.remainSlots
          , dModel.totalPower, dModel.currentPower, dModel.location, dModel.status));

        return false;
      } catch (e) {
        // dialog box
        Log.error(e);
        throw  e;
      }
    }

    throw "Undefined mode";
  }

  StationsAggregator.prototype.DeleteStation = function () {
    try {
      let objs = this.GetSelectedModels();

      let s = this.stations;

      objs.forEach(function (obj) {
        Log.trace(obj);
        s.removeObj(obj);
      });

      this.SelectAll = false;

    } catch (e) {
      Log.trace(e);
    }
  }

  StationsAggregator.prototype.GetSelectedModel = function () {
    let BreakException = {};
    let count = 0;
    let fndObj = {};

    try {
      this.stations.forEach(function (val, index) {

        if (val.selected) {
          if (count >= 1)
            throw BreakException;

          ++count;
          fndObj = {obj: val, index: index};
        }

      });
    } catch (e) {
      if (e !== BreakException) throw e;
      // count > 1
      this.selectedIndex = -1;
      throw "Multi select!";
    }

    if (count == 0) {
      this.selectedIndex = -1;
      throw "Not found";
    }

    this.SelectedIndex = fndObj.index;

    return fndObj;
  }

  StationsAggregator.prototype.GetSelectedModels = function () {
    let BreakException = {};
    let fndObjs = [];

    try {
      this.stations.forEach(function (val, index) {

        if (val.selected) {

          fndObjs.push(val);
        }

      });
    } catch (e) {
    }

    if (fndObjs.length == 0) {
      throw "Not found";
    }

    return fndObjs;
  }

  StationsAggregator.prototype.OnCheckClick = function (event) {
    let localThis = this;

    let selectedObj = jQuery(event.target);

    if (shifted) {

      let checkedIndex = parseInt(selectedObj.attr('data-index'));

      localThis.stations[checkedIndex].selected = selectedObj.is(':checked');

      let start = -1;
      let end = -1;

      localThis.stations.forEach(function (obj, index) {
        //Log.trace(obj.selected);

        if (obj.selected) {
          if (start < 0)
            start = index;

          if(index > end)
            end = index;
        }
      });

      Log.trace(start + ' ' + end);

      if (start < 0 || end < 0)
        return;

      for (let index = start; index <= end; ++index) {
        localThis.stations[index].selected = true;
      }
    }
  };

  return StationsAggregator;
})();
// end StationsAggregator //

// ModalWindows //
let ModalWindows = (function () {

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    });

    let modalOptions = {
      keyboard: true,
      focus: true,
      show: true
    };

    let stationModalObj = () => jQuery('#addStationModal');

    return {
      ShowStationModal() {
        stationModalObj().modal(modalOptions);
      },
      HideStationModal() {
        stationModalObj().modal('hide');
      },
      ShowError(e) {
        e = typeof e == "string" ? e : "undefined";
        toastr.error(e);
      },
      ShowSuccess(e) {
        e = typeof e == "string" ? e : "undefined";
        toastr.success(e);
      }
    };
  }
)();
// end ModalWindows //

// let CheckboxesExts = (function () {
//   let $ = jQuery;
//
//   function CheckboxesExts() {
//     let $chkboxes = $('.chkbox');
//     let lastChecked = null;
//
//     $chkboxes.click(function (e) {
//       if (!lastChecked) {
//         lastChecked = this;
//         return;
//       }
//
//       if (e.shiftKey) {
//         var start = $chkboxes.index(this);
//         var end = $chkboxes.index(lastChecked);
//
//         $chkboxes.slice(Math.min(start, end), Math.max(start, end) + 1).prop('checked', lastChecked.checked);
//       }
//
//       lastChecked = this;
//     });
//   }
//
//   return CheckboxesExts;
// })();

// Core //
window.onload = function () {
  let stationsAggregator = new StationsAggregator();
  app = new Vue(
    {
      el: "#app",
      created() {
        //CheckboxesExts();
      },
      methods: {
        OnAddStation: function () {
          stationsAggregator.AddModelEvent();
        },
        OnEditStation: function () {
          try {
            stationsAggregator.EditModelEvent();
            ModalWindows.ShowStationModal();
          } catch (e) {
            ModalWindows.ShowError(e);
          }
        },
        OnStationsAggregatorSubmit() {
          try {
            if (!stationsAggregator.Submit())
              ModalWindows.HideStationModal();

            if (stationsAggregator.Mode == StationsAggregator.StateType.Add) {
              ModalWindows.ShowSuccess("Station added");
            } else if (stationsAggregator.Mode == StationsAggregator.StateType.Edit) {
              ModalWindows.ShowSuccess("Station updated");
            }
          } catch (e) {
            ModalWindows.ShowError("OnStationsAggregatorSubmit: " + e);
          }
        },
        OnDeleteStation() {
          stationsAggregator.DeleteStation();
        },
        OnStationsAggregatorOnCheckClick(e) {
          stationsAggregator.OnCheckClick(e);
        }
      },
      data: {
        loading: true,
        stations: stationsAggregator.GetStations(),
        stationsAggregator: stationsAggregator
      },
      created() {
        setTimeout(() => {
          this.loading = false;
        }, 100)
      },
      computed: {
        StationModelTitle() {
          return "def";
        }
      }
    }
  );
};
