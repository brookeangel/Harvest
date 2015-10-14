json.extract!(@harvst, :title, :address, :description,
  :privacy, :start_date, :end_date, :image_url, :contact)

json.user do
  json.id @harvst.user_id
  json.username @harvst.user.username
end
