json.array! @harvsts do |harvst|
  json.extract! harvst, :title, :lat, :lng, :id
  json.user do
    json.id harvst.user_id
    json.username harvst.user.username
  end
end
