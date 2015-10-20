(function(root) {
  var CHANGE_EVENT = "change";
  var _notifications = [];

  root.NotificationStore = $.extend({}, EventEmitter.prototype, {
    all: function() {
      return _notifications.slice(0);
    },

    addChangeListener: function(cb) {
      this.on(CHANGE_EVENT, cb);
    },

    removeChangeListener: function(cb) {
      this.removeListener(CHANGE_EVENT, cb);
    },

    resetNotifications: function(notifications) {
      _notifications = notifications;
    },

    addNotification: function(notification) {
      _notifications.push(notification);
    },

    dispatcherID: AppDispatcher.register(function(payload) {
      switch(payload.actionType) {
        case NotificationConstants.NOTIFICATIONS_RECEIVED:
          NotificationStore.resetNotifications(payload.notifications);
          NotificationStore.emit(CHANGE_EVENT);
          break;
        case NotificationConstants.NOTIFICATION_RECEIVED:
          NotificationStore.addNotification(payload.notification);
          NotificationStore.emit(CHANGE_EVENT);
          break;
        case NotificationConstants.NOTIFICATION_REMOVED:
          NotificationStore.removeNotification(payload.notification);
          NotificationStore.emit(CHANGE_EVENT);
          break;
      }
    })
  });
}(this));
