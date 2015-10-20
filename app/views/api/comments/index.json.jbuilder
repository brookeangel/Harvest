json.array! @comments do |comment|
  json.id comment.id
  json.harvst_id comment.harvst_id
  json.user_id comment.user_id
  json.user_username comment.user.username
  json.body comment.body
  json.created_at time_ago_in_words(comment.created_at)
end
