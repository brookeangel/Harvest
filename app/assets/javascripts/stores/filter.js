(function(root) {

  var CHANGE_EVENT = "change";
  var _filterParams = {};

  root.FilterParamsStore = $.extend({}, EventEmitter.prototype, {
    filterParams: function() {
      return _filterParams;
    },

    addChangeListener: function(cb) {
      this.on(CHANGE_EVENT, cb);
    },

    removeChangeListener: function(cb) {
      this.removeListener(CHANGE_EVENT, cb);
    },

    updateFilterParams: function(params) {
      $.extend(_filterParams, params);
    },

    dispatcherID: AppDispatcher.register(function(payload) {
      switch(payload.actionType) {
        case FilterParamsConstants.PARAMS_RECEIVED:
          FilterParamsStore.updateFilterParams(payload.params);
          FilterParamsStore.emit(CHANGE_EVENT);
          break;
        }
    })
  })
}(this));
