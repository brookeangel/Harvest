class Api::HarvstsController < ApplicationController
  before_action :assure_logged_in
  before_action :assure_correct_user, only: [:update, :destroy]

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

    render :show
  end

  def index
    if params[:bounds]
      @harvsts = Harvst.in_bounds(params[:bounds])
                       .includes(:user)
    else
      @harvsts = Harvst.includes(:user, :stars)
    end

  end

  def show
    @harvst = Harvst.includes(:user, :stars).find(params[:id])
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
    params.require(:harvst).permit(:title, :lat, :lng, :image_url, :address)
  end

  def assure_correct_user
    unless Harvst.find(params[:id]).user == current_user
      render json: {error: "You do not have access."}, status: 404
    end
  end
end
