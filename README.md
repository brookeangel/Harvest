# Harvst

[Heroku link][heroku]

[heroku]: https://harvst.herokuapp.com/

## Minimum Viable Product

Harvst is a web application inspired by WWOOF USA and Falling Fruit built using Ruby on Rails
and React.js. Harvst allows users to:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Create an account
- [ ] Log in / Log out
- [ ] Create a profile
- [ ] Add public and private harvests
- [ ] Share their harvests publicly or with specific users
- [ ] Receive notifications about shared harvests
- [ ] Search for harvests in their area
- [ ] Message other users
- [ ] Review harvests

## Design Docs
* [View Wireframes][view]
* [DB schema][schema]

[view]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Model and Authentication, Harvest Model and JSON API (2 days)

In Phase 1, I will begin by implementing user signup and authentication (using
BCrypt). There will be a basic landing page after signup that will contain the
container for the application's root React component. Before building out the
front end, I will begin by setting up a full JSON API for Harvests and Users.

[Details][phase-one]

### Phase 2: Flux Architecture and Harvest CRUD (2 days)

Phase 2 is focused on setting up Flux, the React Router, and the React view
structure for the main application. After the basic Flux architecture has been
set up, Harvest stores will be implemented and a set of actions corresponding
to the needed CRUD functionality created. Once this is done, I will create React
views for the Harvest `Index`, `IndexItem` and `Form`. The Google Maps API will
be integrated into the Harvest Index view. At the end of Phase 2, Harvests can
be created, viewed, edited and destroyed in the browser. Lastly, while constructing
the views I will start using basic bootstrap for styling.

[Details][phase-two]

### Phase 3: Flux Architecture for User Profiles (1 day)

Phase 3 will create Flux architecture for viewing and editing user profiles. A user's
public harvests will be viewable on their profile. Users will also be searchable by
name. I will create React views for the Users `Index`, `Profiles`, `Form`, and 'Search'.

[Details][phase-three]

### Phase 4: Harvest Shares and Messages (1.5 days)

Phase 4 allows users to share private Harvests with other users. Users can view an
index of harvests shared with them. Users can also message other users regarding their harvests.

[Details][phase-four]

### Phase 5: Notifications (1.5 day)

Users will receive a notifications when they are messaged, shared harvests, or reviewed.
Notifications are destroyed after a user has viewed them.

[Details][phase-five]

### Phase 6: Styling Cleanup and Seeding (2 day)

Bootstrap will have been used to keep things organized up until now, but in
Phase 6 I will add styling flourishes.

### Bonus Features (TBD)
- [ ] Prettify transitions
- [ ] User mailer
- [ ] Pagination for Harvest Index
- [ ] Multiple sessions

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
