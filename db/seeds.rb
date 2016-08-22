
user1 = User.create!({
  username: "MaryGardener",
  password: "password",
  affiliation: "individual"
})

user2 = User.create!({
  username: "SFOrganicFarm",
  password: "password",
  affiliation: "organization"
})

harvst1 = user1.harvsts.create!({
  title: "Tomatoes",
  lat: 37.780875,
  lng: -122.41135480000001,
  address: "1061 Market St, San Francisco, CA 94103, USA",
  image_url: "http://res.cloudinary.com/harvst/image/upload/v1445559668/k8c2yfbeqzerpjnfajpw.png"
})

harvst2 = user1.harvsts.create!({
  title: "Fig Tree",
  lat: 37.773972,
  lng: -122.431297,
  address: "160 Spear Street, San Francisco, CA 94103, USA",
  image_url: "http://res.cloudinary.com/harvst/image/upload/v1471809162/fig_tree_x0rjoq.jpg"
})

harvst3 = user1.harvsts.create!({
  title: "Ripe Apples",
  lat: 37.871853,
  lng: -122.258423,
  address: "University of California, Berkeley, CA, USA",
  image_url: "http://res.cloudinary.com/harvst/image/upload/v1471809162/apple_tree_oo5fhr.jpg"
})


harvst4 = user2.harvsts.create!({
  title: "Potato Harvest",
  lat: 37.7752303,
  lng: -122.4361076,
  address: "1198 Hayes St, San Francisco, CA 94117, USA",
  image_url: "http://res.cloudinary.com/harvst/image/upload/v1471809163/potato_xject1.jpg"
})

harvst5 = user2.harvsts.create!({
  title: "Yummy Beets",
  lat: 37.761014,
  lng: -122.483066,
  address: "1418 25th Avenue, San Francisco, CA 94122, USA",
  image_url: "http://res.cloudinary.com/harvst/image/upload/v1471809161/beets_iwsm0g.jpg"
})

harvst6 = user2.harvsts.create!({
  title: "Lettuce",
  lat: 37.791305,
  lng: -122.393735,
  address: "160 Spear Street, San Francisco, CA 94177, USA",
  image_url: "http://res.cloudinary.com/harvst/image/upload/v1471809162/lettuce_ss7gwl.jpg"
})

Star.create!(user: user1, harvst: harvst6)
Star.create!(user: user1, harvst: harvst4)
Star.create!(user: user2, harvst: harvst1)
Star.create!(user: user2, harvst: harvst2)
