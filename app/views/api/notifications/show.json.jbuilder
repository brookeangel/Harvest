json.id @notification.id
json.notifyable_type @notification.notifyable_type
json.notifyable_id @notification.notifyable_id
if @notification.notifyable_type == "Comment"
  json.message "You've harvest received a comment."
else
  json.message "You've been shared a harvest."
end
