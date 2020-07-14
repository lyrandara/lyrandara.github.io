
let UsersComponent = (function () {

  const paginatorMaxObjects = 5;

  let StateType = Aggregator.StateType;

  function UsersComponent(vueModel) {
    let _this = this;

    this.model = vueModel;

    let sAgg = this.usersAggregator = new Aggregator(new UsersAggregator());

    VueModelInitial(vueModel);

    let objs = sAgg.GetObjects();

    CopyObjects(vueModel.data, {
      usersAggregator: sAgg,
      users: objs,
      usersTotal: objs.length,
      userRoles : User.Roles
    });

    CopyObjects(vueModel.methods, {
      OnAddUser: function () {
        ModalWindows.ShowUserModal();
        sAgg.AddModelEvent();
      },
      OnEditUser: function () {
        try {
          sAgg.EditModelEvent();
          ModalWindows.ShowUserModal();
        } catch (e) {
          ModalWindows.ShowError(e);
        }
      },
      OnUsersAggregatorSubmit() {
        try {
          let mode = sAgg.Mode;
          if (!sAgg.Submit())
            ModalWindows.HideUserModal();

          if (mode == StateType.Add) {
            ModalWindows.ShowSuccess("User added");
          } else if (mode == StateType.Edit) {
            ModalWindows.ShowSuccess("User updated");
          }
        } catch (e) {
          ModalWindows.ShowError("OnusersAggregatorSubmit: " + e);
        }

        _this.Filter();
      },
      OnDeleteUser() {
        sAgg.DeleteModel();
        _this.Filter();
      },
      OnUsersAggregatorCheckClick(e) {
        sAgg.OnCheckClick(e);
      }
    });

    vueModel.methods.previewFiles = function (obj, event) {
      let files = event.target.files;

      //Log.trace(obj);
      //Log.trace(event.target);

      if(typeof files != "undefined" && files.length > 0)
      {
        obj.logoName = Files.GetFileName(event.target.value);
        obj.SetLogo(window.URL.createObjectURL(files[0]));
      }
    }

    vueModel.methods.CheckIfAdmin = function (r, model) {
      return r != User.Roles.Admin && model.Roles.indexOf(User.Roles.Admin) != -1;
    };

    let paginatorObj = new PaginatorComponent(vueModel, paginatorMaxObjects);
    this.paginatorObj = paginatorObj;

    paginatorObj.Callback = (objs) => {
      this.SetRecords(objs);
    }

    this.autorowsTable = new AutoRowsTable(paginatorObj);

    vueModel.userInitsCallbacks.push(()=> {
      _this.Filter();
      setTimeout(()=> {
        this.autorowsTable.Init();
        this.autorowsTable.UpdateMaxPageObjects();
      }, 500);
    });

    let timer = null;
    window.onresize = () => {
      if(timer != null)
        clearTimeout(timer);

      timer = setTimeout(()=> {
        this.autorowsTable.UpdateMaxPageObjects();
      }, 500);
    };

  }

  UsersComponent.prototype.Filter = function()
  {
    let objs = this.usersAggregator.GetObjects();

    objs = this.paginatorObj.Filter(objs);

    this.SetRecords(objs);
  }

  UsersComponent.prototype.SetRecords = function(objs) {
    this.model.data.usersTotal = this.usersAggregator.GetObjects().length;
    this.model.data.users = objs;
  }

  return UsersComponent;
})();
