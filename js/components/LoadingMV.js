function LoadingMV(vueModel) {

  if (typeof vueModel.data == "undefined")
    vueModel.data = {};

  CopyObjects(vueModel.data, {
    loading: true
  });

  this.model = vueModel;
}

LoadingMV.prototype.Hide = function () {
  let data = this.model.data;
  setTimeout(() => {

    data.loading = false;

  }, 100);
}
