let Aggregator = (function () {
  const StateType = Object.freeze({"None": 0, "Add": 1, "Edit": 2});
  const titles = ["default", "Add", "Update"];

  let shifted = false;

  jQuery(document).on('keyup keydown', function (e) {
    shifted = e.shiftKey
  });

  function Aggregator(concreteAggregator) {

    if (typeof concreteAggregator != "object") {
      throw "concreteAggregator not set";
    }

    this.concreteAggregator = concreteAggregator;

    //this.title = "default";
    this.Mode = StateType.None;

    this.selectedIndex = -1;

    this.noHide = false;
    this.selectAll = false;

    this.title = titles[this.Mode];

    this.CreateDefaultModel();
  }

  // Delegation //
  Aggregator.prototype.GetObjects = function () {
    return this.concreteAggregator.GetObjects();
  }

  Aggregator.prototype.GetTitles = function () {
    if (typeof this.concreteAggregator.GetTitles != "function")
      return titles;

    return this.concreteAggregator.GetTitles();
  }


  Object.defineProperty(Aggregator, "StateType", {
    get() {
      return StateType;
    }
  });

  Object.defineProperty(Aggregator.prototype, "SelectAll", {
    get() {
      return this.selectAll;
    },
    set(val) {
      this.selectAll = val;

      this.GetObjects().forEach(function (obj, index) {
        obj.selected = val;
      });
    }
  });

  Object.defineProperty(Aggregator.prototype, "SelectedIndex", {
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

  Object.defineProperty(Aggregator.prototype, "Mode", {
    get() {
      return this.mode;
    },
    set(val) {
      this.mode = val;
      let t = this.GetTitles();
      if (isNaN(val) || val >= titles.length)
        this.title = t[StateType.None];
      else
        this.title = t[val];
    }
  });

  Aggregator.prototype.GetDefaultModel = function () {
    return this.defaultModel;
  }

  Aggregator.prototype.CreateDefaultModel = function () {
    this.defaultModel = this.concreteAggregator.CreateDefaultModel();
  }

  Aggregator.prototype.AddModelEvent = function () {
    this.Mode = StateType.Add;
    this.CreateDefaultModel();
  }

  Aggregator.prototype.EditModelEvent = function () {
    this.Mode = StateType.Edit;

    try {
      let sTuple = this.GetSelectedModel();

      Log.trace(sTuple.index);

      let s = sTuple.obj;

      this.defaultModel = s.Clone();

      return true;
    } catch (e) {
      // dialog box
      Log.error(e);
      throw e;
    }

    return false;
  }

  Aggregator.prototype.DeleteModel = function () {
    try {
      let objs = this.GetSelectedModels();

      let s = this.GetObjects();

      objs.forEach(function (obj) {
        Log.trace(obj);
        s.removeObj(obj);
      });

      this.SelectAll = false;

    } catch (e) {
      Log.trace(e);
    }
  }

  Aggregator.prototype.Submit = function () {
    let localObjects = this.GetObjects();
    let dModel = this.defaultModel;

    Log.trace("Mode " + this.Mode);

    if (this.Mode == StateType.Add) {

      localObjects.push(dModel.Clone());

      return this.noHide;
    } else if (this.Mode == StateType.Edit) {

      try {

        let index = this.SelectedIndex;

        Log.trace(index);

        localObjects.removeItem(index);
        localObjects.splice(index, 0, dModel.Clone());

        return false;
      } catch (e) {
        // dialog box
        Log.error(e);
        throw  e;
      }
    }

    throw "Undefined mode";
  }

  Aggregator.prototype.OnCheckClick = function (event) {
    let localObjects = this.GetObjects();

    let selectedObj = jQuery(event.target);

    if (shifted) {

      let checkedIndex = parseInt(selectedObj.attr('data-index'));

      localObjects[checkedIndex].selected = selectedObj.is(':checked');

      let start = -1;
      let end = -1;

      localObjects.forEach(function (obj, index) {
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
        localObjects[index].selected = true;
      }
    }
  };

  Aggregator.prototype.GetSelectedModel = function () {
    let BreakException = {};
    let count = 0;
    let fndObj = {};

    try {
      this.GetObjects().forEach(function (val, index) {

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

  Aggregator.prototype.GetSelectedModels = function () {
    let BreakException = {};
    let fndObjs = [];

    try {
      this.GetObjects().forEach(function (val, index) {

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

  return Aggregator;
})();
