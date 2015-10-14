# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

harvst = Harvst.create({
  user_id: 1,
  title: "So many carrots",
  description: "Lovely orange carrots for days and days",
  address: "12517 Maestro Ct, San Diego, CA, 92130",
  privacy: "public",
  contact: "6190-846-0167"
  })
