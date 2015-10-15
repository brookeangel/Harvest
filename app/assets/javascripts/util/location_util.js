window.LocationUtil = {
  fetchAddress: function(lat, lng) {
    $.ajax({
      url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+ lat + ','+ lng +'&key=AIzaSyDUpcTC4LuU7miLmrkawx2t-WhJtfi7dvw',
      type: 'get',
      dataType: 'json',
      success: function(data) {
        var formatted_address = data.results[0].formatted_address;
        LocationActions.receiveOne(formatted_address);
      }
    })
  },

  fetchCoords: function(address, cb) {
    $.ajax({
      url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyDUpcTC4LuU7miLmrkawx2t-WhJtfi7dvw',
      type: 'get',
      dataType: 'json',
      success: function(data) {
        var lat = data.results[0].geometry.location.lat;
        var lng = data.results[0].geometry.location.lng;
        var address = data.results[0].formatted_address;
        LocationActions.receiveCoords(lat, lng, address);
        cb();
      },
      error: function(data) {
        console.log(data);
      }
    })
  }
}
