(function(root) {
  var CHANGE_EVENT = "change";
  var _harvsts = [];
  var _harvstShow = {};
  var _activeHarvst = null;

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

    getActiveHarvst: function() {
      return _activeHarvst;
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

    setActiveHarvst: function(harvst) {
      _activeHarvst = harvst;
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
        case HarvstConstants.ACTIVE_HARVST_RECEIVED:
          HarvstStore.setActiveHarvst(payload.harvst);
          HarvstStore.emit(CHANGE_EVENT);
          break;
      }
    })
  })
}(this))
