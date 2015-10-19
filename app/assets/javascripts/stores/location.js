(function(root) {
  var CHANGE_EVENT = "change";
  var _address = {};
  var _coords = {};

  root.LocationStore = $.extend({}, EventEmitter.prototype, {

    getAddress: function() {
      return _address;
    },

    getCoords: function() {
      return _coords;
    },

    addChangeListener: function(cb) {
      this.on(CHANGE_EVENT, cb);
    },

    removeChangeListener: function(cb) {
      this.removeListener(CHANGE_EVENT, cb);
    },

    setAddress: function(address) {
      _address = address;
    },

    setCoords: function(lat, lng) {
      _coords.lat = lat;
      _coords.lng = lng;
    },

    dispatcherID: AppDispatcher.register(function(payload) {
      switch(payload.actionType) {
        case LocationConstants.ADDRESS_RECEIVED:
          LocationStore.setAddress(payload.address);
          LocationStore.emit(CHANGE_EVENT);
          break;
        case LocationConstants.COORDS_RECEIVED:
          LocationStore.setCoords(payload.lat, payload.lng);
          LocationStore.setAddress(payload.address);
          LocationStore.emit(CHANGE_EVENT);
          break;
      }
    })
  });
}(this));
