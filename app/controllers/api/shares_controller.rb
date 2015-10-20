class Api::SharesController < ApplicationController
  before_action :assure_logged_in
  before_action :assure_correct_user, only: [:create, :destroy]

  def create
    @share = Share.new
    @share.harvst_id = params[:share][:harvstId]
    @share.user = User.find_by_username(params[:share][:username])

    if @share.save
      render :show
    else
      render json: @share.errors.full_messages, status: 422
    end
  end

  def destroy
    @share = Share.find(params[:id])

    if @share
      @share.destroy
    end

    render :show
  end

  def index
    if (params[:harvstId])
      @shares = Share.includes(:user).where(harvst_id: params[:harvstId].to_i)
    else
      @shares = Share.includes(:user).where(user_id: current_user.id)
    end
  end

  private

  def assure_correct_user
    unless Harvst.find(params[:share][:harvstId]).user == current_user
      render json: {error: "You do not have access."}, status: 404
    end
  end
end
