(function(root) {

  var CHANGE_EVENT = "change";
  var _errors = [];

  root.MessageStore = $.extend({}, EventEmitter.prototype, {
    allErrors: function() {
      return _errors;
    },

    addChangeListener: function(cb) {
      this.on(CHANGE_EVENT, cb);
    },

    removeChangeListener: function(cb) {
      this.removeListener(CHANGE_EVENT, cb);
    },

    resetErrors: function(errors) {
      _errors = JSON.parse(errors);
    },

    dispatcherID: AppDispatcher.register(function(payload) {
      switch(payload.actionType) {
        case MessageConstants.ERRORS_RECEIVED:
          MessageStore.resetErrors(payload.errors);
          MessageStore.emit(CHANGE_EVENT);
          break;
        }
    })
  })
}(this));
