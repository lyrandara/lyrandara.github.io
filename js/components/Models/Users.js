// User //
function User(name, logo, login, password, totalScooters, roles, cities) {
  this.selected = false;

  this.name = name;

  this.SetLogo(logo);

  this.login = login;
  this.password = password;
  this.totalScooters = totalScooters;

  this.Role = roles;

  this.logoName = "";
  this.cities = cities || [];
}

User.prototype.AddLocation = function(country, city) {
  this.cities.push(new Location(country, city, "", ""))
}

User.prototype.SetLocations = function(locations) {
  this.cities = locations;
}

User.prototype.GetLocations = function() {
  return this.cities;
}

User.Roles = Object.freeze({
  Admin: "Admin",
  User: "User",
  Customer: "Customer"
});

User.prototype.SetLogo = function(logo) {
  // if(typeof logo == "string")
  // {
  // }
  // else if(!IsObject(logo, "File"))
  //    logo = new File([""], "dafaultFileName");

  if(typeof logo == "string")
  {
    this.logo = logo;

    return;
  }

  this.logo = "";
}

Object.defineProperty(User.prototype, "Password", {
  get() {
    return "*******";
  },
  set(pass) {
    this.password = pass;
  }
});

Object.defineProperty(User.prototype, "Role", {
  get: function () {
   if(typeof this.roles == "object")
   {
     return this.roles.join('/');
   }

    if(typeof this.roles == "string")
    {
      return this.roles;
    }

    return User.Roles.User;
  },
  set(role){
    if(typeof role == "undefined") {
      this.roles = [User.Roles.User];
    }
    else if(typeof role == "string") {
      this.roles = [role];
    }
    else {
      this.roles = role;
    }
  }
});

Object.defineProperty(User.prototype, "Roles", {
  get: function () {
    return this.roles;
  },
  set(roles){
    if(roles.indexOf(User.Roles.Admin) != -1)
    {
      this.roles = [User.Roles.Admin];
    }
    else {
      this.roles = roles;
    }
  }
});

// Object.defineProperty(User.prototype, "GetStatusClass", {
//   get: function () {
//     if (this.status == 0) return "text-secondary";
//     else if (this.status == 1) return "text-success";
//     else if (this.status == -1) return "text-danger";
//     else return "text-secondary";
//   }
// });

// Implement interface function //
User.prototype.Clone = function() {
  let s = this;
  let u = new User(s.name, s.logo, s.login, s.password, this.totalScooters, this.Roles);
  u.logoName = s.logoName;
  return u;
}

// end User //

// UsersAggregator //
let UsersAggregator = (function () {

  const Roles = User.Roles;

  const StatusType = Object.freeze({"Error": -1, "Disabled": 0, "Enabled": 1});
  const titles = ["default", "Add User", "Update User"];

  const StateType = Aggregator.StateType;

  function UsersAggregator() {

    this.Users = [
      new User("Uber", "", "Test user1", "xxxxx", 11, [Roles.Admin]),
      new User("Lime", "", "Test user2", "xxxxx", 12, [Roles.User, Roles.Customer]),
      new User("Google", "", "Test user3", "xxxxx", 13),
      new User("User 4", "", "Test user4", "xxxxx", 14),
      new User("User 5", "", "Test user5", "xxxxx", 15),
      new User("Lime 1", "", "Test user2", "xxxxx", 12, [Roles.User, Roles.Customer]),
      new User("Lime 2", "", "Test user2", "xxxxx", 12, [Roles.User, Roles.Customer]),
      new User("Lime 3", "", "Test user2", "xxxxx", 12, [Roles.User, Roles.Customer]),
      new User("Lime 4", "", "Test user2", "xxxxx", 12, [Roles.User, Roles.Customer]),
      new User("Lime 5", "", "Test user2", "xxxxx", 12, [Roles.User, Roles.Customer]),
      new User("Lime 6", "", "Test user2", "xxxxx", 12, [Roles.User, Roles.Customer]),
      new User("Lime 7", "", "Test user2", "xxxxx", 12, [Roles.User, Roles.Customer]),
      new User("Lime 8", "", "Test user2", "xxxxx", 12, [Roles.User, Roles.Customer]),
      new User("Lime 9", "", "Test user2", "xxxxx", 12, [Roles.User, Roles.Customer]),
      new User("Lime 10", "", "Test user2", "xxxxx", 12, [Roles.User, Roles.Customer]),
      new User("Lime 11", "", "Test user2", "xxxxx", 12, [Roles.User, Roles.Customer]),
      new User("Lime 12", "", "Test user2", "xxxxx", 12, [Roles.User, Roles.Customer]),
      new User("Lime 13", "", "Test user2", "xxxxx", 12, [Roles.User, Roles.Customer]),
      new User("Lime 14", "", "Test user2", "xxxxx", 12, [Roles.User, Roles.Customer])
    ];
  }

  // Implement interface functions //
  UsersAggregator.prototype.GetTitles = function () {
    return titles;
  }

  UsersAggregator.prototype.GetObjects = function () {
    return this.Users;
  }

  UsersAggregator.prototype.CreateDefaultModel = function () {
    return new User("", "", "", "", 0, Roles.User);
  }
  return UsersAggregator;

})();
// end UsersAggregator //

let Files = {
  GetFileName(filePath){
    return filePath.replace(/^.*[\\\/]/, '')
  }
};
