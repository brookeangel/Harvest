class Api::StarsController < ApplicationController
  before_action :assure_logged_in

  def create
    star = Star.new(star_params)
    star.user = current_user
    star.save!
    @harvst = star.harvst
    render '/api/harvsts/show'
  end

  def destroy
    star = Star.find(params[:id])
    star.destroy!
    @harvst = star.harvst
    render '/api/harvsts/show'
  end

  private

  def star_params
    params.require(:star).permit(:harvst_id)
  end
end
