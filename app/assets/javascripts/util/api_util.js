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

  fetchUserHarvsts: function(id, privacy) {
    $.ajax({
      url: '/api/users/'+ id + '/harvsts',
      method: 'GET',
      data: {privacy: privacy},
      dataType: 'json',
      success: function(result) {
        ApiActions.receiveAll(result);
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

  fetchUsers: function(id) {
    $.ajax({
      url: '/api/users',
      type: 'get',
      dataType: 'json',
      success: function(result) {
        ApiActions.recieveAllUsers(result);
      }
    })
  },

  updateUser: function(id, params, cb) {
    $.ajax({
      url: '/api/users/' + id,
      type: 'patch',
      data: params,
      dataType: 'json',
      success: function(result) {
        ApiActions.recieveOneUser(result);
        cb();
      },
      error(result) {
        MessageActions.receiveErrors(result.responseText);
      }
    })
  },
}
