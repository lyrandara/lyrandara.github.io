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
    let userModalObj = () => jQuery('#addUserModal');

    return {
      ShowStationModal() {
        stationModalObj().modal(modalOptions);
      },
      HideStationModal() {
        stationModalObj().modal('hide');
      },
      ShowUserModal() {
        userModalObj().modal(modalOptions);
      },
      HideUserModal() {
        userModalObj().modal('hide');
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

