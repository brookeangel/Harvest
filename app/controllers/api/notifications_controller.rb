class Api::NotificationsController < ApplicationController
  before_action :ensure_correct_user, only: [:destroy]

  def index
    @notifications = Notification.where(user_id: current_user.id)
  end

  def create
    @notification = Notification.new(notification_params)

    if @notification.save
      render :show
    else
      render json: @notification.errors.full_messages, status: 422
    end
  end

  def destroy
    @notification = Notification.find(params[:id])

    if @notification
      @notification.destroy
      render json: "Notification viewed."
    else
      render json: "Notification does not exist.", status: 422
    end
  end

  private

  def notification_params
    params.require(:notification).permit(:notifyable_type, :notifyable_id, :user_id)
  end

  def ensure_correct_user
    unless Notification.find(params[:id])
      render json: "You don't have access to this notification.", status: 422
    end
  end
end
