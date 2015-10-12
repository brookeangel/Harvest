# Phase 4: Harvest Shares and Notifications (1.5 days)

## Rails
### Models
* Shares
* Messages

### Controllers
* Api::SharesController (create, show, index)
* Api::ReviewsController (create, show, index, destroy)

### Views
* shares/index.json.jbuilder
* messages/index.json.jbuilder
* messages/message.json.jbuilder (partial)

## Flux
### Views (React Components)
* MessagesIndex
  - MessagesIndexItem
* MessagesForm

### Stores
* Shares
* Messages

### Actions
* ApiActions.receiveAllMessages
* ApiActions.receiveSingleMessage
* ApiActions.deleteMessages
* ApiActions.receiveAllShares

### ApiUtil
* ApiUtil.fetchAllShares
* ApiUtil.createShare
* ApiUtil.fetchAllMessages
* ApiUtil.fetchSingleMessage
* ApiUtil.createMessage
* ApiUtil.destroyMessage

## Gems/Libraries
