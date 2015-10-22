(function(root) {

  root.HarvstActions = {
    receiveOne: function(harvst) {
      AppDispatcher.dispatch({
        actionType: HarvstConstants.ACTIVE_HARVST_RECEIVED,
        harvst: harvst
      });
    }
  };
}(this));
