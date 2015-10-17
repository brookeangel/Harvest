class Api::UsersController < ApplicationController
  before_action :assure_logged_in
  before_action :assure_correct_user, only: [:update]

  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])

    if @user.update(user_params)
      render :show
    else
      render json: @harvst.errors.full_messages, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :website_url, :description)
  end

  def assure_correct_user
    User.find(params[:id].to_i) == current_user
  end

end
