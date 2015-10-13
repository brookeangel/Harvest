class Api::UsersController < ApplicationController
  before_action :assure_logged_in
  before_action :assure_correct_user, only: [:update]

  def index
    @user = User.all
  end

  def show
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])

    if @user.update(user_params)
      redirect_to user_url(@user)
    else
      flash.now[:errors] = @user.errors.full_messages
    end
  end

  private

  def assure_correct_user
    @user.find(params[:id]) == current_user
  end

end
