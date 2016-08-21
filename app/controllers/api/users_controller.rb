class Api::UsersController < ApplicationController
  before_action :assure_logged_in, only: [:index, :show]
  before_action :assure_correct_user, only: [:update]

  def index
    @users = User.all
  end

  def create
    @user = User.new(signup_params)
    if @user.save
      session[:session_token] = @user.session_token
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def show
    @user = User.includes(:harvsts).includes(:shared_harvsts).find(params[:id])
    @harvsts = @user.harvsts.where(privacy: 'public')
  end

  def update
    @user = User.find(params[:id])
    @harvsts = @user.harvsts.where(privacy: 'public')

    if @user.update(user_params)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private

  def signup_params
    params.require(:user)
          .permit(:username, :password, :affiliation)
  end

  def user_params
    params.require(:user)
          .permit(:email, :website_url, :description, :profile_img_url)
  end

  def assure_correct_user
    unless params[:id] == current_user.id
      render json: ["You do not have access."], status: 401
    end
  end
end
