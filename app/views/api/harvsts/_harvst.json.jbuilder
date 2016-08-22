json.extract!(harvst, :title, :lat, :lng, :image_url, :id, :address)

json.created_at time_ago_in_words(harvst.created_at) + " ago"

json.user do
  json.id harvst.user_id
  json.username harvst.user.username
end
