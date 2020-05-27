
let UsersAggregatorMView = (function () {

  let StateType = Aggregator.StateType;

  function UsersAggregatorMView(vueModel) {
    let sAgg = this.usersAggregator = new Aggregator(new UsersAggregator());

    if (typeof vueModel.data == "undefined")
      vueModel.data = {};

    if (typeof vueModel.methods == "undefined")
      vueModel.methods = {};

    CopyObjects(vueModel.data, {
      usersAggregator: sAgg,
      users: sAgg.GetObjects()
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
            ModalWindows.ShowSuccess("Station added");
          } else if (mode == StateType.Edit) {
            ModalWindows.ShowSuccess("Station updated");
          }
        } catch (e) {
          ModalWindows.ShowError("OnusersAggregatorSubmit: " + e);
        }
      },
      OnDeleteUser() {
        sAgg.DeleteModel();
      },
      OnUsersAggregatorCheckClick(e) {
        sAgg.OnCheckClick(e);
      }
    });

    this.model = vueModel;
  }

  return UsersAggregatorMView;
})();
