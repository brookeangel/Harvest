json.extract!(
  @user, :username, :email, :description, :affiliation, :website_url,
  :profile_img_url, :id
  )

json.harvsts @user.harvsts
