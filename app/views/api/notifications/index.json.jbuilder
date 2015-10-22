json.array! @notifications do |notification|

  json.extract!(notification, :id, :notifyable_type, :notifyable_id, :viewed, :created_at)

  json.harvst_id notification.notifyable.harvst_id

  if notification.notifyable_type == "Comment"
    json.message notification.notifyable.user.username.to_s + " commented on your harvest."
  else
    json.message notification.notifyable.harvst.user.username.to_s + " shared a harvest with you."
  end
end
