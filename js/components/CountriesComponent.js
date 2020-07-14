let CountriesComponent = function (countries) {

    countries = countries || new CountriesModel();

    let defaultCountry = "Latvia";
    let defaultCity = "Riga";

    function Init($this) {
        jQuery('.select2').select2().on('change', function () {
            let obj = jQuery(this);
            if(obj.attr('id').search("city") != -1)
            {
                $this.model.data.citiesSelector = obj.val();
                //Log.trace('city');
            }
            else if(obj.attr('id').search("country") != -1)
            {
                $this.model.data.countriesSelector = obj.val();
                //Log.trace('country');
            }
        });
    }

    function CountriesComponent(vueModel, defCountry, defCity) {
        let $this = this;

        defCountry = defCountry || defaultCountry;
        defCity = defCity || defaultCity;

        this.Callback = function(country, city){};

        VueModelInitial(vueModel);

        let countriesNames = countries.GetCountries();
        let cities = countries.GetAllCities();

        CopyObjects(vueModel.data, {
            countries: countriesNames,
            countriesSelector: defCountry,
            cities: cities,
            citiesSelector: defaultCity
        });

        let selectedCountry = defCountry;
        let selectedCity = defaultCity;

        CopyObjects(vueModel.watch, {
            countriesSelector: function (country, oldVal) {

                selectedCountry = country;

                let filteredCities = countries.GetCitiesByCountry(country);

                if(filteredCities.length == 0)
                  return;

                vueModel.data.cities = filteredCities;
                vueModel.data.citiesSelector = selectedCity = "All";

                setTimeout(() => {
                    Init($this);
                }, 100);

                $this.Callback(country, "All");
            },
            citiesSelector: function (city, oldVal) {

                selectedCity = city;

                $this.Callback(selectedCountry, city);
            }
        });

        this.model = vueModel;
        this.cityArr = countries;
        this.cities = cities;
        this.GetCountry = function () {
            return selectedCountry;
        }
        this.GetCity = function () {
            return selectedCity;
        }

        vueModel.userInitsCallbacks.push(function () {

            vueModel.watch.countriesSelector(defCountry);
            vueModel.watch.citiesSelector(defCity);

            vueModel.data.citiesSelector = defCity;

            Init($this);
        });
    }

    CountriesComponent.GetLocations = () => citiesModel.GetLocations();

    CountriesComponent.prototype.GetCityByName = function(val) {
        return this.cityArr.filter(x => x.name == val);
    };

    return CountriesComponent;
};