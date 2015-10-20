(function(root) {
  var CHANGE_EVENT = "change";
  var _comments = [];

  root.CommentStore = $.extend({}, EventEmitter.prototype, {
    all: function() {
      return _comments.slice(0);
    },

    addChangeListener: function(cb) {
      this.on(CHANGE_EVENT, cb);
    },

    removeChangeListener: function(cb) {
      this.removeListener(CHANGE_EVENT, cb);
    },

    resetComments: function(comments) {
      _comments = comments;
    },

    removeComment: function(comment) {
      matchIdx = -1;
      _comments.map(function(storedComment, idx) {
        if (storedComment.id === comment.id) {
          matchIdx = idx;
        }
      });

      if (matchIdx !== -1) {
        _comments.splice(matchIdx, 1);
      }
    },

    addComment: function(comment) {
      _comments.push(comment);
    },

    dispatcherID: AppDispatcher.register(function(payload) {
      switch(payload.actionType) {
        case CommentConstants.COMMENTS_RECEIVED:
          CommentStore.resetComments(payload.comments);
          CommentStore.emit(CHANGE_EVENT);
          break;
        case CommentConstants.COMMENT_RECEIVED:
          CommentStore.addComment(payload.comment);
          CommentStore.emit(CHANGE_EVENT);
          break;
        case CommentConstants.COMMENT_REMOVED:
          CommentStore.removeComment(payload.comment);
          CommentStore.emit(CHANGE_EVENT);
          break;
      }
    })
  });
}(this));
