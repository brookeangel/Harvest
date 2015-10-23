class Api::HarvstsController < ApplicationController
  before_action :assure_logged_in
  before_action :assure_correct_user, only: [:update, :destroy]
  before_action :restrict_private_harvsts, only: [:show]

  def create
    @harvst = Harvst.new(harvst_params)
    @harvst.user_id = current_user.id
    if @harvst.save
      render :show
    else
      render json: @harvst.errors.full_messages, status: 422
    end
  end

  def destroy
    @harvst = Harvst.find(params[:id])

    if @harvst
      @harvst.destroy
    end

    render :index
  end

  def index
    if params[:bounds]
      @harvsts = Harvst.in_bounds(params[:bounds])
                       .includes(:user)
    elsif params[:sharedId]
      @harvsts = Share.includes(:harvst)
                      .where(user_id: params[:sharedId])
                      .map { |share| share.harvst }
    else
      @harvsts = User.find(params[:user_id]).harvst_settings(params[:privacy])
    end
  end

  def show
    @harvst = Harvst.includes(:user).includes(:comments).find(params[:id])
  end

  def update
    @harvst = Harvst.find(params[:id])

    if @harvst.update(harvst_params)
      render :show
    else
      render json: @harvst.errors.full_messages, status: 422
    end
  end

  private

  def harvst_params
    params.require(:harvst).permit(:title, :description, :lat, :lng, :privacy,
      :end_date, :image_url, :contact, :address)
  end

  def assure_correct_user
    unless Harvst.find(params[:id]).user_id == current_user.id
      render json: {error: "You do not have access."}, status: 404
    end
  end

  def restrict_private_harvsts
    harvst = Harvst.includes(:shares).find(params[:id])
    not_owner = harvst.user_id != current_user.id
    not_shared = harvst.shares.none? { |share| share.user_id == current_user.id }

    if harvst.private? && not_owner && not_shared
      render json: {error: "You do not have access."}, status: 404
    end
  end
end
