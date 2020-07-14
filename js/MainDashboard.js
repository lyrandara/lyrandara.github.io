let app;

window.onload = function() {

  let RangeStates = DateRangePresetsModel.States;

  let vueModel = {
    el: "#app",
    computed: {},
    data: {},
    methods: {},
    userInitsCallbacks: []
  };

  let dashboardObj = new DashboardComponent(vueModel);

  let stationRatingComponent = new StationRatingComponent(vueModel, RangeStates.All, new StationsRating2(),
      [32.068683, 34.767, 14, 16], {
        country : "Israel",
        city: "Tel Aviv"
      }, new CountriesModel2());


  app = new Vue(vueModel);

};
