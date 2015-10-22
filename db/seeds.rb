
user1 = User.create!({
  username: "MaryGardener",
  email: "MaryGardener@example.com",
  password: "password",
  password_confirmation: "password",
  description: "I love gardening! I grow figs, oranges, carrots, and more in my little yard.",
  affiliation: "individual",
  website_url: "www.facebook.com",
})

user2 = User.create!({
  username: "SFOrganicFarm",
  email: "SFOrganicFarm@example.com",
  password: "password",
  password_confirmation: "password",
  description: "SF Organic Farm strives to provide quality produce to the SF community. We collect harvests from community members' gardens to donate to food banks around San Francisco. Please share your harvests with us so that we can continue our mission of providing quality produce to San Francisco food banks!",
  affiliation: "organization",
  profile_img_url: "http://res.cloudinary.com/harvst/image/upload/v1445534339/zwinsvyxhhhz6voiy6tx.png",
  website_url: "www.facebook.com"
})

harvst1 = user1.harvsts.create!({
  title: "So many tomatoes",
  description: "Lovely heirloom tomatoes",
  lat: 37.780875,
  lng: -122.41135480000001,
  address: "1061 Market St, San Francisco, CA 94103, USA",
  privacy: "private",
  contact: "619-846-0167",
  description: "Our garden is overflowing with lovely heirloom tomatoes. Please come and harvst them! The harvst is located in our backyard- text before coming over and we'll let you right in!",
  image_url: "http://res.cloudinary.com/harvst/image/upload/v1445534383/beat56s7vgzkidbfujrt.png"
})


harvst2 = user2.harvsts.create!({
  title: "Come harvest our potatoes.",
  description: "We have several plots of potatoes ready to harvest! Bring your friends
  and a box to bring home your collection of harvested potatoes.",
  lat: 37.7752303,
  lng: -122.4361076,
  address: "1198 Hayes St, San Francisco, CA 94117, USA",
  privacy: "public",
  contact: "619-846-0167"
})

share1 = Share.create!({user_id: user2.id, harvst_id: harvst1.id})

comment1 = user2.comments.create!({harvst_id: harvst1.id, body: "Hi Mary Gardener! Thank you so much for sharing your harvest. Would next Wednesday be an okay day to stop by?"})
comment2 = user1.comments.create!({harvst_id: harvst1.id, body: "No problem, SF Organic Farm! We're happy to share our harvst. Wednesday would be perfect."})
