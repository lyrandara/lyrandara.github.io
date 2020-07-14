let app;

function DisableAllNotImplemented() {
  jQuery('.btn-group').not('[data-toggle="buttons"]').addClass('disabled').find('button').attr('disabled','disabled');
  jQuery('#messages-page button').addClass('disabled').attr('disabled','disabled');
  jQuery('#system-logs button').addClass('disabled').attr('disabled','disabled');
  jQuery('.filter-tabs a').addClass('disabled').on('click', ()=> { return false; });
}

DisableAllNotImplemented();

let DefaultVueModel = (function() {

  function DefaultVueModel() {

    let responsiveTable = new ResponsiveTable();

    let vueModel = {
      el: "#app",
      computed: {},
      data: {},
      methods: {},
      userInitsCallbacks: []
    };

    let mvLoading = new LoadingComponent(vueModel);

    mvLoading.CallBack = () => {
      responsiveTable.Update();
      Log.trace("size updated");
    }

    responsiveTable.CallBack = (height) => {
      jQuery('#map-container').height(height);
    };

    CopyObjects(vueModel, {
      mounted() {
        mvLoading.Hide();

        responsiveTable.Update();

        VueExts.RunInitCallBacks(vueModel);

      },
      updated(){
        responsiveTable.Update();
      },
      created(){
      }
    });

    this.vueModel = vueModel;
  }

  DefaultVueModel.prototype.GetModel = function () {
    return this.vueModel;
  }

  return DefaultVueModel;
})();

// Core //
window.onload = function () {

  let vueModel = (new DefaultVueModel()).GetModel();

  if (document.getElementById('stations-page') != null) {
    let stationsComponent = new StationsComponent(vueModel,{
      country : "Israel",
      city: "Tel Aviv"
    }, new CountriesModel2());
  }

  if (document.getElementById('scooters-page') != null) {
    let scootersComponent = new ScootersComponent(vueModel,{
      country : "Israel",
      city: "Tel Aviv"
    }, new CountriesModel2());
  }

  if (document.getElementById('billing-page') != null) {
    let billingComponent = new BillingComponent(vueModel,{
      country : "Israel",
      city: "Tel Aviv"
    }, new CountriesModel2());
  }

  if (document.getElementById('users-page') != null) {
    let usersComponent = new UsersComponent(vueModel);
  }

  if (document.getElementById('power-cost-page') != null) {
    let powerCostComponent = new PowerCostComponent(vueModel, {
      country : "Israel",
      city: "Tel Aviv"
    }, new CountriesModel2());
  }

  if (document.getElementById('messages-page') != null) {
    let responsiveMessages = new ResponsiveMessages();
  }

  if (document.getElementById('system-logs') != null) {
    let responsiveMessages = new SystemLogsComponent(vueModel);
  }

  if (document.getElementById('incoming-msg-page') != null) {
    let responsiveMessages = new MessagesComponent(vueModel, new IncomingMessages());
  }

  if (document.getElementById('outgoing-msg-page') != null) {
    let responsiveMessages = new MessagesComponent(vueModel, new OutgoingMessages());
  }

  if (document.getElementById('user-city-list-page') != null) {
    let usersComponent = new UsersCitiesComponent(vueModel);
  }

  if(document.getElementById('station-rating-page') != null) {
    let RangeStates = DateRangePresetsModel.States;
    let stationRatingComponent = new StationRatingComponent(vueModel, RangeStates.LastMonth, new StationsRating2(),
        [32.068683,34.767,14], {
          country : "Israel",
          city: "Tel Aviv"
        }, new CountriesModel2());
  }

  let headerInfo = new HeaderInfo(vueModel);

  app = new Vue(vueModel);

};











