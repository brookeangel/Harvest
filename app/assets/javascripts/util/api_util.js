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
    });
  },

  fetchHarvst: function(id) {
    $.ajax({
      url: '/api/harvsts/' + id,
      type: 'get',
      dataType: 'json',
      success: function(result) {
        ApiActions.receiveOne(result);
      }
    });
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
    });
  },

  fetchSharedHarvsts: function(id) {
    $.ajax({
      url: '/api/harvsts',
      method: 'GET',
      data: {sharedId: id},
      dataType: 'json',
      success: function(result) {
        ApiActions.receiveAll(result);
      }
    });
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
    });
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
    });
  },

  deleteHarvst: function(id, cb) {
    $.ajax({
      url: '/api/harvsts/' + id,
      type: 'delete',
      dataType: 'json',
      success: function(result) {
        cb();
      }
    });
  },

  fetchUser: function(id) {
    $.ajax({
      url: '/api/users/' + id,
      type: 'get',
      dataType: 'json',
      success: function(result) {
        ApiActions.receiveOneUser(result);
      }
    });
  },

  fetchUsers: function(id) {
    $.ajax({
      url: '/api/users',
      type: 'get',
      dataType: 'json',
      success: function(result) {
        ApiActions.receiveAllUsers(result);
      }
    });
  },

  updateUser: function(id, params, cb) {
    $.ajax({
      url: '/api/users/' + id,
      type: 'patch',
      data: params,
      dataType: 'json',
      success: function(result) {
        ApiActions.receiveOneUser(result);
        cb();
      },
      error: function(result) {
        MessageActions.receiveErrors(result.responseText);
      }
    });
  },

  addShare: function(params, cb) {
    $.ajax({
      url: '/api/shares',
      type: 'post',
      data: {share: params},
      dataType: 'json',
      success: function(result) {
        ApiActions.receiveOneShare(result);
        MessageActions.receiveErrors('[]');
        cb(result);
      },
      error: function(result) {
        MessageActions.receiveErrors('["User not found."]');
      }
    });
  },

  fetchHarvstShares: function(harvstId) {
    $.ajax({
      url: '/api/shares',
      type: 'get',
      data: {harvstId: harvstId},
      dataType: 'json',
      success: function(result) {
        ApiActions.receiveAllShares(result);
      }
    });
  },

  deleteShare: function(share) {
    $.ajax({
      url: '/api/shares/' + share.id,
      type: 'delete',
      dataType: 'json',
      data: {share: {harvstId: share.harvst_id}},
      success: function(result) {
        ApiActions.removeShare(result);
        MessageActions.receiveErrors('[]');
      }
    });
  },

  fetchComments: function(harvstId) {
    $.ajax({
      url: '/api/harvsts/' + harvstId + '/comments',
      type: 'get',
      dataType: 'json',
      success: function(result) {
        ApiActions.receiveAllComments(result);
      }
    });
  },

  addComment: function(params, cb) {
    $.ajax({
      url: '/api/comments',
      type: 'post',
      data: {comment: params},
      dataType: 'json',
      success: function(result) {
        ApiActions.receiveOneComment(result);
        MessageActions.receiveErrors('[]');
        cb(result);
      },
      error: function(result) {
        MessageActions.receiveErrors('["Comment must contain content."]');
      }
    });
  },

  deleteComment: function(comment) {
    $.ajax({
      url: '/api/comments/' + comment.id,
      type: 'delete',
      dataType: 'json',
      success: function(result) {
        ApiActions.removeComment(result);
        MessageActions.receiveErrors('[]');
      }
    });
  },

  addNotification: function(params) {
    $.ajax({
      url: '/api/notifications',
      type: 'post',
      data: {notification: params},
      dataType: 'json',
      success: function(result) {
        console.log('notification sent');
      }
    });
  },

  fetchNotifications: function() {
    $.ajax({
      url: '/api/notifications',
      type: 'get',
      dataType: 'json',
      success: function(result) {
        ApiActions.receiveNotifications(result);
      }
    });
  }
};
