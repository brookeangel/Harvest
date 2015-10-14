window.ApiUtil = {
  fetchHarvsts: function(boundsObj) {
    var params = boundsObj;
    $.ajax({
      url: '/api/harvsts',
      method: 'GET',
      dataType: 'json',
      data: params,
      success: function(result) {
        ApiActions.receiveAll(result);
      }
    })
  },

  fetchHarvst: function(id) {
    $.ajax({
      url: '/api/harvsts/' + id,
      type: 'get',
      dataType: 'json',
      success: function(result) {
        ApiActions.receiveOne(result);
      }
    })
  },

  addHarvst: function(params) {
    $.ajax({
      url: '/api/harvsts/',
      type: 'post',
      dataType: 'json',
      success: function(result) {
        console.log('harvest success');
      }
    })
  }
}
