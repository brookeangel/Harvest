class Api::UsersController < ApplicationController
  before_action :assure_logged_in
  before_action :assure_correct_user, only: [:update]

  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
    @harvsts = Harvst.where(user_id: params[:id]).where(privacy: 'public')
  end

  def update
    @user = User.find(params[:id])
    @harvsts = Harvst.where(user_id: params[:id]).where(privacy: 'public')

    if @user.update(user_params)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :website_url, :description, :profile_img_url)
  end

  def assure_correct_user
    unless params[:id].to_i == current_user.id
      render json: "You do not have access.", status: 404
    end
  end

end
