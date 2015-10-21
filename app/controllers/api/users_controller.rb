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
    @user = User.includes(:harvsts).find(params[:id])

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
    unless params[:id].to_i == current_user.id
      render json: "You do not have access.", status: 404
    end
  end

end
