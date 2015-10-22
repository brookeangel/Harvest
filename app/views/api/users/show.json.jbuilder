json.extract!(
  @user, :username, :email, :description, :affiliation, :website_url,
  :profile_img_url, :id
  )

json.harvsts @harvsts

json.private_harvsts @user.harvsts
json.shared_harvsts @user.shared_harvsts
