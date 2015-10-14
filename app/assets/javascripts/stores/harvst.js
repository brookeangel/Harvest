(function(root) {
  var CHANGE_EVENT = "change";
  var _harvsts = [];
  var _harvstShow = {};

  root.HarvstStore = $.extend({}, EventEmitter.prototype, {
    all: function() {
      return _harvsts.slice(0);
    },

    findHarvst: function(id) {
      var harvstIds = _harvsts.map(function(harvst) {return harvst["id"];});
      var index = harvstIds.indexOf(id);
      return _harvsts[index];
    },

    getHarvst: function() {
      return _harvstShow;
    },

    addChangeListener: function(cb) {
      this.on(CHANGE_EVENT, cb);
    },

    removeChangeListener: function(cb) {
      this.removeListener(CHANGE_EVENT, cb);
    },

    resetHarvsts: function(harvsts) {
      _harvsts = harvsts;
    },

    setHarvst: function(harvst) {
      _harvstShow = harvst;
    },

    dispatcherID: AppDispatcher.register(function(payload) {
      switch(payload.actionType) {
        case HarvstConstants.HARVSTS_RECEIVED:
          HarvstStore.resetHarvsts(payload.harvsts);
          HarvstStore.emit(CHANGE_EVENT);
          break;
        case HarvstConstants.HARVST_RECEIVED:
          HarvstStore.setHarvst(payload.harvst);
          HarvstStore.emit(CHANGE_EVENT);
          break;
      }
    })
  })
}(this))
