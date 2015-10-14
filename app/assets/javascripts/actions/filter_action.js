(function(root) {

  root.FilterActions = {
    receiveAll: function(params) {
      AppDispatcher.dispatch({
        actionType: FilterParamsConstants.PARAMS_RECEIVED,
        params: params
      });
    }
  };
}(this));
