(function(root) {
  var CHANGE_EVENT = "change";
  var _users = [];
  var _userShow;

  root.UserStore = $.extend({}, EventEmitter.prototype, {
    all: function() {
      return _users.slice(0);
    },

    getUser: function() {
      return _userShow;
    },

    addChangeListener: function(cb) {
      this.on(CHANGE_EVENT, cb);
    },

    removeChangeListener: function(cb) {
      this.removeListener(CHANGE_EVENT, cb);
    },

    resetUsers: function(users) {
      _users = users;
    },

    setUser: function(user) {
      _userShow = user;
    },

    dispatcherID: AppDispatcher.register(function(payload) {
      switch(payload.actionType) {
        case UserConstants.USERS_RECEIVED:
          UserStore.resetUsers(payload.users);
          UserStore.emit(CHANGE_EVENT);
          break;
        case UserConstants.USER_RECEIVED:
          UserStore.setUser(payload.user);
          UserStore.emit(CHANGE_EVENT);
          break;
      }
    })
  });
}(this));
