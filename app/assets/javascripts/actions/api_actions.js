(function(root) {

  root.ApiActions = {
    receiveAll: function(harvsts) {
      AppDispatcher.dispatch({
        actionType: HarvstConstants.HARVSTS_RECEIVED,
        harvsts: harvsts
      });
    },

    receiveOne: function(harvst) {
      AppDispatcher.dispatch({
        actionType: HarvstConstants.HARVST_RECEIVED,
        harvst: harvst
      })
    },

    recieveOneUser: function(user) {
      AppDispatcher.dispatch({
        actionType: UserConstants.USER_RECEIVED,
        user: user
      });
    },

    recieveAllUsers: function(users) {
      AppDispatcher.dispatch({
        actionType: UserConstants.USERS_RECEIVED,
        users: users
      });
    },

  }
}(this));
