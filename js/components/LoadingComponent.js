function LoadingComponent(vueModel) {

  if (typeof vueModel.data == "undefined")
    vueModel.data = {};

  CopyObjects(vueModel.data, {
    loading: true
  });

  this.model = vueModel;
  this.CallBack = () => {};
}

LoadingComponent.prototype.Hide = function () {
  let data = this.model.data;
  setTimeout(() => {

    data.loading = false;
    this.CallBack();

  }, 100);
}
