# Phase 4: Harvest Shares and Notifications (1.5 days)

## Rails
### Models
* Shares
* Reviews

### Controllers
* Api::SharesController (create, show, index)
* Api::ReviewsController (create, show, index, destroy)

### Views
* shares/index.json.jbuilder
* reviews/index.json.jbuilder
* reviews/review.json.jbuilder (partial)

## Flux
### Views (React Components)
* ReviewsIndex
  - ReviewsIndexItem
* ReviewsForm

### Stores
* Shares
* Reviews

### Actions
* ApiActions.receiveAllReviews
* ApiActions.receiveSingleReview
* ApiActions.deleteReview
* ApiActions.receiveAllShares

### ApiUtil
* ApiUtil.fetchAllShares
* ApiUtil.createShare
* ApiUtil.fetchAllReviews
* ApiUtil.createReview
* ApiUtil.destroyReview

## Gems/Libraries
