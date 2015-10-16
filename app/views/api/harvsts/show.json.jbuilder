json.extract!(@harvst, :title, :lat, :lng, :description,
  :privacy, :end_date, :image_url, :contact, :address, :id)

json.created_at time_ago_in_words(@harvst.created_at)

json.user do
  json.id @harvst.user_id
  json.username @harvst.user.username
end
