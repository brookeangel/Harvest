json.extract!(harvst, :title, :lat, :lng, :image_url, :id, :address)

json.created_at time_ago_in_words(harvst.created_at) + " ago"

if harvst.is_starred?(current_user)
  json.star_id harvst.stars.find_by(user: current_user).id
end
json.user do
  json.id harvst.user_id
  json.username harvst.user.username
end
