
let UsersCitiesComponent = (function () {

    let countriesModel = new CountriesModel();

    function UsersCitiesComponent(vueModel) {
        let _this = this;

        this.model = vueModel;

        let sAgg = this.usersAggregator = new Aggregator(new UsersAggregator());

        VueModelInitial(vueModel);

        let objs = sAgg.GetObjects();

        let locations = countriesModel.GetLocations();

        //Log.trace(locations);

        let selectedUser = null;
        let selectedLocations = [];

        if(objs.length > 0) {
            selectedUser = objs[0];
            selectedLocations = selectedUser.GetLocations();
        }

        CopyObjects(vueModel.data, {
            usersAggregator: sAgg,
            users: objs,
            usersTotal: objs.length,
            locations: locations,
            selectedLocations: selectedLocations,
            selectedUser : [selectedUser]
        });

        this.citiesGroup = null;

        vueModel.userInitsCallbacks.push(()=> {

            _this.citiesGroup = $('.duallistbox').bootstrapDualListbox({
                nonSelectedListLabel: 'Available City',
                selectedListLabel: 'Add city to User',
                moveOnSelect: false,
                infoText: false
            }).on('change',function(){

                let list = [];

                $(this).find('option[data-sortindex]').each(function(i) {

                    let selectedIndex = parseInt($(this).attr('data-index'));

                    list.push(locations[selectedIndex]);
                });

                _this.SetLocationsToSelectedUsers(list);
            })
        });

        CopyObjects(vueModel.watch, {
            selectedUser: function (users, oldVal) {
                if(typeof users == "undefined" || users.length == 0)
                    return;

                _this.LoadLocations(users);
            }
        });

    }

    UsersCitiesComponent.prototype.SetLocationsToSelectedUsers = function(list) {
        if(this.model.data.selectedUser.length == 0)
            return;

        this.model.data.selectedUser.forEach( u => {
            if(typeof u == 'object')
            {
                u.SetLocations(Array.ConcatUnique(u.GetLocations(), list));
            }
        });
    }

    UsersCitiesComponent.prototype.LoadLocations = function(users) {

        if(typeof users == "undefined" || users.length == 0)
            return;

        this.model.data.selectedLocations = [];

        users.forEach( u => {
            this.model.data.selectedLocations = Array.ConcatUnique(this.model.data.selectedLocations, u.GetLocations());
        });

        this.citiesGroup.find('option').removeAttr('data-sortindex');
        setTimeout(()=>{
            this.citiesGroup.bootstrapDualListbox('refresh');
        }, 100);
    }

    UsersCitiesComponent.prototype.SetRecords = function(objs) {
        this.model.data.usersTotal = this.usersAggregator.GetObjects().length;
        this.model.data.users = objs;
    }

    return UsersCitiesComponent;
})();
