class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  helper_method :current_user, :logged_in?

  def assure_logged_in
    unless logged_in?
      render json: "Please log in.", status: 401
    end
  end


  def login!(user)
    user.reset_session_token!
    session[:session_token] = user.session_token
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
  end


end
