(function(root) {
  var CHANGE_EVENT = "change";
  var _shares = [];

  root.ShareStore = $.extend({}, EventEmitter.prototype, {
    all: function() {
      return _shares.slice(0);
    },

    addChangeListener: function(cb) {
      this.on(CHANGE_EVENT, cb);
    },

    removeChangeListener: function(cb) {
      this.removeListener(CHANGE_EVENT, cb);
    },

    resetShares: function(shares) {
      _shares = shares;
    },

    removeShare: function(share) {
      matchIdx = -1;
      _shares.map(function(storedShare, idx) {
        if (storedShare.id === share.id) {
          matchIdx = idx;
        }
      });

      if (matchIdx !== -1) {
        _shares.splice(matchIdx, 1);
      }
    },

    addShare: function(share) {
      _shares.push(share);
    },

    dispatcherID: AppDispatcher.register(function(payload) {
      switch(payload.actionType) {
        case ShareConstants.SHARES_RECEIVED:
          ShareStore.resetShares(payload.shares);
          ShareStore.emit(CHANGE_EVENT);
          break;
        case ShareConstants.SHARE_RECEIVED:
          ShareStore.addShare(payload.share);
          ShareStore.emit(CHANGE_EVENT);
          break;
        case ShareConstants.SHARE_REMOVED:
          ShareStore.removeShare(payload.share);
          ShareStore.emit(CHANGE_EVENT);
          break;
      }
    })
  });
}(this));
