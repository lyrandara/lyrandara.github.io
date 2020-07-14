let MapComponent = function (model) {
  model = model || new CitiesModel();

  //let citiesComponent = CitiesComponent(model, "mapCities", "mapCitySelector");
  let locations = model.GetLocations();

  const zoom  = 10;
  const iconsDir = "css/images/";

  function InitMap(all) {

    Log.trace(all);
    //let all = locations['All'];

    let mapSelector = 'map-container';

    let mymap = {
      setView(x, y) {
      }
    };

    if (jQuery('#' + mapSelector).length > 0) {

      if(typeof all == "undefined" || all.length < 2) {
        all = [56.9500885,24.0319015, zoom];
      }

      if(all.length < 3)
      {
        all[2] = zoom;
      }

      // mymap = L.map(mapSelector, {
      //   center: [56.9500885,24.0319015],
      //   zoom: zoom
      // });
      mymap = L.map(mapSelector, {
        center: [all[0], all[1]],
        zoom: all[2]
      });

      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1
      }).addTo(mymap);

      // Creating a custom icon
      const rate = 1.37;
      const width = 40;

      let icons = [
        L.icon({
          iconUrl: iconsDir + 'marker-icon.png',
          iconSize: [width, width * rate]
        }),
        L.icon({
          iconUrl: iconsDir + 'marker-icon_1.png',
          iconSize: [width, width * rate]
        }),
        L.icon({
          iconUrl: iconsDir + 'marker-icon_2.png',
          iconSize: [width, width * rate]
        }),
        L.icon({
          iconUrl: iconsDir + 'marker-icon_3.png',
          iconSize: [width, width * rate]
        }),
        L.icon({
          iconUrl: iconsDir + 'marker-icon_4.png',
          iconSize: [width, width * rate]
        })
      ];

      locations.forEach( l => {
        if (l != 'All') {
          L.marker(l.GetGeoPos(), {
            icon : icons[2] //Math.round(Math.random() * 4)
          }).bindPopup(l.GetString).addTo(mymap);
          //Log.trace(l.GetGeoPos());
        }
      });

      // let popup = L.popup();
      // mymap.on('click', function (e) {
      //   console.log(e);
      //   //let titleArr = locations.filter( x=> x.GetGeoPos());
      //   popup
      //       .setLatLng(e.latlng)
      //       .setContent("Position " + e.latlng.toString())
      //       .openOn(mymap);
      // });
    }

    return mymap;
  }
  // map

  //Log.trace(cityArr);

  function MapComponent(vueModel, geoPosAll) {

    let _this = this;

    if(typeof geoPosAll == "undefined" || geoPosAll.length < 2) {
      geoPosAll = [56.9500885,24.0319015, zoom];
    }

    if(geoPosAll.length < 3)
    {
      geoPosAll[2] = zoom;
    }

    this.zoom = geoPosAll[3] || geoPosAll[2];

    VueModelInitial(vueModel);

    ///let citiesComponentObj = new citiesComponent(vueModel);

    let mymap = null;

    // CopyObjects(vueModel.watch, {
    //   mapCitySelector: function (val, oldVal) {
    //     //_this.setView(citiesComponentObj.GetCityByName(val));
    //     _this.setView(citiesComponentObj.GetCityByName(val));
    //   }
    // });

    vueModel.methods.SelLocation = function(e) {
      let index = parseInt(e.target.attributes["data-index"].value);
      Log.trace(locations[index].GetGeoPos())

      _this.setView(locations[index].GetGeoPos());
    }

    vueModel.userInitsCallbacks.push(()=> {
      mymap = InitMap(geoPosAll);
    });

    this.model = vueModel;

    this.setView = function(geoPos) {

      // if(selObjs.length == 0)
      //   return;
      //
      // let obj = selObjs[0];
      //
      // //Log.trace(obj);
      //
      // if(mymap != null)
      //   mymap.setView(obj.location, obj.zoom);

      if(mymap != null) {
        mymap.setView([geoPos[0], geoPos[1]],  this.zoom);
      }

    }
  }

  return MapComponent;
}
