json.array! @notifications do |notification|
  json.id notification.id
  json.notifyable_type notification.notifyable_type
  json.notifyable_id notification.notifyable_id
  json.harvst_id notification.notifyable.harvst_id
  json.viewed notification.viewed
  if notification.notifyable_type == "Comment"
    json.message notification.notifyable.user.username.to_s + " commented on your harvest."
  else
    json.message notification.notifyable.user.username.to_s + " shared a harvest with you."
  end
end
