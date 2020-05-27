// User //
function User() {
  let args = Array.from(arguments);

  this.selected = false;

  this.userId = args[0];
  this.name = args[1];
  this.logo = args[2];
  this.description = args[3];
  this.status = args[4];
}

Object.defineProperty(User.prototype, "GetStatusClass", {
  get: function () {
    if (this.status == 0) return "text-secondary";
    else if (this.status == 1) return "text-success";
    else if (this.status == -1) return "text-danger";
    else return "text-secondary";
  }
});

// Implement interface function //
User.prototype.Clone = function() {
  let s = this;
  return new User(s.userId, s.name, s.logo, s.description, s.status);
}

// end User //

// UsersAggregator //
let UsersAggregator = (function () {

  const StatusType = Object.freeze({"Error": -1, "Disabled": 0, "Enabled": 1});
  const titles = ["default", "Add User", "Update User"];

  const StateType = Aggregator.StateType;

  function UsersAggregator() {

    this.Users = [
      new User(1, "User 1", "Logo 1", "Test user", StatusType.Error),
      new User(1, "User 2", "Logo 2", "Test user2", StatusType.Disabled),
      new User(1, "User 3", "Logo 3", "Test user3", StatusType.Enabled),
      new User(1, "User 4", "Logo 4", "Test user4", StatusType.Enabled),
      new User(1, "User 5", "Logo 5", "Test user5", StatusType.Disabled)
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
    return new User("", "", "", "", 0);
  }

  return UsersAggregator;
})();
// end UsersAggregator //

