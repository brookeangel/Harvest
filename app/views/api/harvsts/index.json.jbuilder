json.array! @harvsts do |harvst|
  json.extract! harvst, :title, :address, :user
end
