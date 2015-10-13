window.ApiUtil = {
  fetchHarvests: function(privacyInfo) {
    var params = privacyInfo;
    $.ajax({
      url: '/api/harvests',
      type: 'get',
      data: params,
      dataType: 'json',
      success: function(result) {
        ApiActions.receiveAll(result);
      }
    })
  },

  fetchHarvest: function(privacyInfo) {
    $.ajax({
      url: '/api/harvests',
      type: 'get',
      data: params,
      dataType: 'json',
      success: function(result) {
        ApiActions.receiveAll(result);
      }
    })
  }
}
