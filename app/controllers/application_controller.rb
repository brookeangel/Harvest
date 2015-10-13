class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  helper_method :current_user, :logged_in?

  def assure_not_logged_in
    if logged_in?
      redirect_to root_url
    end
  end

  def assure_logged_in
    unless logged_in?
      flash[:errors] = ["Please log in to enjoy our site."]
      redirect_to new_session_url
    end
  end


  def login!(user)
    user.reset_session_token!
    session[:session_token] = user.session_token
    redirect_to user_url(user)
  end


  def current_user
    User.find_by(session_token: session[:session_token])
  end

  def logged_in?
    !current_user.nil?
  end

  def logout!(user)
    session[:session_token] = nil
    user.reset_session_token!
    redirect_to new_session_url
  end


end
