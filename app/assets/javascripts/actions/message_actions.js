(function(root) {

  root.MessageActions = {
    receiveErrors: function(errors) {
      AppDispatcher.dispatch({
        actionType: MessageConstants.ERRORS_RECEIVED,
        errors: errors
      })
    }
  }
}(this));
