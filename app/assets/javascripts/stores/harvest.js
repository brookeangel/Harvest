(function(root) {
  var CHANGE_EVENT = "change";
  var _harvests = [];

  root.HarvestStore = $.extend({}, EventEmitter.prototype, {
    all: function() {
      return _bikes.slice(0);
    },

    getHarvest: function(id) {
      var harvestIds = _harvests.map(function(harvest) {return harvest["id"];});
      var index = harvestIds.indexOf(id);
      return _harvests[index];
    },

    addChangeListener: function(cb) {
      this.on(CHANGE_EVENT, cb);
    },

    removeChangeListener: function(cb) {
      this.removeListener(CHANGE_EVENT, cb);
    },

    resetHarvests: function(harvests) {
      _harvests = harvests;
    },

    addHarvest: function(harvest) {
      _harvests.push(harvest);
    },

    dispatcherID: AppDispatcher.register(function(payload) {
      switch(payload.actionType) {
        case HarvestConstants.HARVESTS_RECEIVED:
          HarvestStore.resetHarvests(payload.harvests);
          HarvestStore.emit(CHANGE_EVENT);
          break;
        case HarvestConstants.HARVEST_RECEIVED:
          HarvestStore.addHarvest(payload.harvest);
          HarvestStore.emit(CHANGE_EVENT);
          break;
      }
    })
  })
}(this))
