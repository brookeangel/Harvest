(function(root) {

  root.LocationActions = {
    receiveOne: function(address) {
      AppDispatcher.dispatch({
        actionType: LocationConstants.ADDRESS_RECEIVED,
        address: address
      })
    },

    receiveCoords: function(lat, lng, address) {
      AppDispatcher.dispatch({
        actionType: LocationConstants.COORDS_RECEIVED,
        lat: lat,
        lng: lng,
        address: address
      })
    }
  }
}(this));
