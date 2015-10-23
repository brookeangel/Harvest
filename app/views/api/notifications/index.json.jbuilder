json.array! @notifications do |notification|

  json.extract!(notification, :id, :notifyable_type, :notifyable_id, :viewed, :created_at)


  if notification.notifyable_type == "Harvst"
    json.harvst_id notification.notifyable_id
    json.message notification.notifying_user.username.to_s + " commented on your harvest."
  else
    json.harvst_id notification.notifyable.harvst_id
    json.message notification.notifying_user.username.to_s + " shared a harvest with you."
  end
end
