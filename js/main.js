let app;

// Core //
window.onload = function () {

  let vueModel = {
    el: "#app",
    computed: {},
    data: {},
    methods: {},
    created() {
      mvLoading.Hide();
    }
  };

  let mvStations = new StationsAggregatorMView(vueModel);
  let mvLoading = new LoadingMV(vueModel);
  let mvUsers = new UsersAggregatorMView(vueModel);

  app = new Vue(vueModel);

};
