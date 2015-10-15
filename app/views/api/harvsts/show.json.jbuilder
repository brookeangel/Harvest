json.extract!(@harvst, :title, :lat, :lng, :description,
  :privacy, :created_at, :end_date, :image_url, :contact, :address)

json.user do
  json.id @harvst.user_id
  json.username @harvst.user.username
end
