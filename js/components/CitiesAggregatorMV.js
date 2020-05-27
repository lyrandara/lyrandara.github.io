function City() {
  let args = Array.from(arguments);

  //this.selected = false;
  this.name = args[0];
  this.location = args[1];
  this.zoom = typeof args[1][2] == "undefined" ? 7 : args[1][2];
}

let CitiesAggregatorMV = (function () {
  let cityArr = [];

  let locations = {
    'All': [55.825973, 17.98517, 4],
    'Kiev' : [50.445262, 30.531903],
    'Riga' : [56.926993, 24.127669],
    'Tallin' : [59.369593, 24.739754],
    'Helsinki' : [60.23163, 24.920331],
    'Amsterdam': [52.335339, 4.946472],
    'Paris' : [48.84592, 2.333719],
    'Warsaw' : [52.214339, 20.899708],
    'Frankfurt' : [49.922935, 8.849602]
  };

  let all = locations['All'];
  let mymap = L.map('map-container').setView(all, all[2]);

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
      '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
  }).addTo(mymap);

  for (let l in locations) {

    if(l != 'All')
      L.marker(locations[l]).addTo(mymap);

    cityArr.push(new City(l, locations[l]))
  }

  let popup = L.popup();
  mymap.on('click', function (e) {
    //console.log(e);
    popup
      .setLatLng(e.latlng)
      .setContent("Position " + e.latlng.toString())
      .openOn(mymap);
  });
  // map

  //Log.trace(cityArr);

  function CitiesAggregatorMV(vueModel) {

    if (typeof vueModel.data == "undefined")
      vueModel.data = {};

    if (typeof vueModel.methods == "undefined")
      vueModel.methods = {};

    if (typeof vueModel.watch == "undefined")
      vueModel.watch = {};

    CopyObjects(vueModel.data, {
      cities: cityArr,
      citiesSelector: "All"
    });

    CopyObjects(vueModel.watch, {
      citiesSelector: function (val, oldVal) {
        let selObjs = cityArr.filter(x => x.name == val);

        if(selObjs.length == 0)
          return;

        let obj = selObjs[0];

        //Log.trace(obj);

        mymap.setView(obj.location, obj.zoom);
      }
    });

    this.model = vueModel;
  }

  return CitiesAggregatorMV;
})();
