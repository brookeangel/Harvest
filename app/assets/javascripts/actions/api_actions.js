(function(root) {

  root.ApiActions = {
    receiveAll: function(harvsts) {
      AppDispatcher.dispatch({
        actionType: HarvstConstants.HARVSTS_RECEIVED,
        harvsts: harvsts
      })
    },

    receiveOne: function(harvst) {
      AppDispatcher.dispatch({
        actionType: HarvstConstants.HARVST_RECEIVED,
        harvst: harvst
      })
    }
  }
}(this));
