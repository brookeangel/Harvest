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

  addHarvst: function(params, cb) {
    $.ajax({
      url: '/api/harvsts',
      type: 'post',
      data: {harvst: params},
      dataType: 'json',
      success: function(result) {
        ApiActions.receiveOne(result);
        cb(result);
      },
      error: function(result) {
        MessageActions.receiveErrors(result.responseText);
      }
    })
  },

  updateHarvst: function(params, cb) {
    $.ajax({
      url: '/api/harvsts/' + params.id,
      type: 'patch',
      data: {harvst: params},
      dataType: 'json',
      success: function(result) {
        ApiActions.receiveOne(result);
        cb(result);
      },
      error: function(result) {
        MessageActions.receiveErrors(result.responseText);
      }
    })
  },

  deleteHarvst: function(id, cb) {
    $.ajax({
      url: '/api/harvsts/' + id,
      type: 'delete',
      dataType: 'json',
      success: function(result) {
        cb();
      }
    })
  },

  fetchUser: function(id) {
    $.ajax({
      url: '/api/users/' + id,
      type: 'get',
      dataType: 'json',
      success: function(result) {
        ApiActions.recieveOneUser(result);
      }
    })
  },
}
