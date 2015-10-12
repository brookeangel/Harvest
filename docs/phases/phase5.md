# Phase 5: Notifications (1.5 Days)

## Rails
### Models
* Notifications

### Controllers
* Api::NotificationsController (create, index, destroy, show)

### Views
* notifications/index.json.jbuilder

## Flux
### Views (React Components)
* NotificationsIndex
  - NotificationsIndexItem

### Stores
* Notifications

### Actions
* ApiActions.receiveAllNotifications

### ApiUtil
* ApiUtil.fetchAllNotifications
* ApiUtil.createNotification
* ApiUtil.destroyNotification

## Gems/Libraries
