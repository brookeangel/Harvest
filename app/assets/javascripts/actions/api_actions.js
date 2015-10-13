(function(root) {

  root.ApiActions = {
    receiveAll: function(harvests) {
      AppDispatcher.dispatch({
        actionType: HarvestConstants.HARVESTS_RECEIVED,
        harvests: harvests
      })
    },

    receiveOne: function(harvest) {
      AppDispatcher.dispatch({
        actionType: HarvestConstants.HARVEST_RECEIVED,
        harvest: harvest
      })
    }
  }
}(this));
