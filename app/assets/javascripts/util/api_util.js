window.ApiUtil = {
  fetchHarvsts: function() {
    $.ajax({
      url: '/api/harvsts',
      type: 'get',
      dataType: 'json',
      success: function(result) {
        ApiActions.receiveAll(result);
      }
    })
  },

  fetchHarvst: function(privacyInfo) {
    $.ajax({
      url: '/api/harvsts',
      type: 'get',
      data: params,
      dataType: 'json',
      success: function(result) {
        ApiActions.receiveAll(result);
      }
    })
  }
}
