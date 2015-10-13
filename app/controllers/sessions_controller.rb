class SessionsController < ApplicationController
  before_action :assure_logged_in, only: [:destroy]
  before_action :assure_not_logged_in, only: [:new]

  def new
    @user = User.new
  end

  def create
    @user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )

    if @user
      login!(@user)
    else
      flash.now[:errors] = ["Invalid username/password."]
      render :new
    end
  end

  def destroy
    @user = current_user

    if current_user
      logout!(@user)
    else
      redirect_to :new_session_url
    end
  end
end
