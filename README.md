# Harvst

[See it live!][heroku]

[heroku]: harvst.herokuapp.com

Harvst is a web application inspired by WWOOF USA and Falling Fruit built using Ruby on Rails
and React.js / Redux. Harvst allows users to:

- Create an account
- Log in / Log out
- Create, Read, Update, and Destroy Harvests
- Search for harvests in their area
- Star harvests

## Local Development

### Basic install

Harvest locally using:

```
// Install the modules!
> npm install

// Build the app!
> npm run-script build

// Download the gems!
> bundle install

// Set up your db!
> bundle exec rake db:reset

// Start your servers!
> bundle exec rails s
```

Check it out at `localhost:3000`!

### Working with maps

You'll also need a Google Maps API key if you want to view the map.

Get it here: https://developers.google.com/maps/documentation/javascript/get-api-key

Then add it to your environment:
```
> bundle exec figaro install
```

And in application.yml:
```
GOOGLE_MAPS_KEY: secret_key_here
```

Don't forget to restart your server!

Problems? Let Brooke know!
