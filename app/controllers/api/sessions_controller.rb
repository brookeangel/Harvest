class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )

    if @user
      login!(@user)
      render :show
    else
      render json: ["Invalid username/password."], status: 422
    end
  end

  def destroy
    logout!(current_user)
    render json: {}
  end
end
