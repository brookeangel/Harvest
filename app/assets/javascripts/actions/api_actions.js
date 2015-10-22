(function(root) {

  root.ApiActions = {
    receiveAll: function(harvsts) {
      AppDispatcher.dispatch({
        actionType: HarvstConstants.HARVSTS_RECEIVED,
        harvsts: harvsts
      });
    },

    receiveOne: function(harvst) {
      AppDispatcher.dispatch({
        actionType: HarvstConstants.HARVST_RECEIVED,
        harvst: harvst
      });
    },

    receiveOneUser: function(user) {
      AppDispatcher.dispatch({
        actionType: UserConstants.USER_RECEIVED,
        user: user
      });
    },

    receiveAllUsers: function(users) {
      AppDispatcher.dispatch({
        actionType: UserConstants.USERS_RECEIVED,
        users: users
      });
    },

    receiveOneShare: function(share) {
      AppDispatcher.dispatch({
        actionType: ShareConstants.SHARE_RECEIVED,
        share: share
      });
    },

    receiveAllShares: function(shares) {
      AppDispatcher.dispatch({
        actionType: ShareConstants.SHARES_RECEIVED,
        shares: shares
      });
    },

    removeShare: function(share) {
      AppDispatcher.dispatch({
        actionType: ShareConstants.SHARE_REMOVED,
        share: share
      });
    },

    receiveAllComments: function(comments) {
      AppDispatcher.dispatch({
        actionType: CommentConstants.COMMENTS_RECEIVED,
        comments: comments
      });
    },

    receiveOneComment: function(comment) {
      AppDispatcher.dispatch({
        actionType: CommentConstants.COMMENT_RECEIVED,
        comment: comment
      });
    },

    removeComment: function(comment) {
      AppDispatcher.dispatch({
        actionType: CommentConstants.COMMENT_REMOVED,
        comment: comment
      });
    },

    receiveNotifications: function(notifications) {
      AppDispatcher.dispatch({
        actionType: NotificationConstants.NOTIFICATIONS_RECEIVED,
        notifications: notifications
      });
    }

  };
}(this));
