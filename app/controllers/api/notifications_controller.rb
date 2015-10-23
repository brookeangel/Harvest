class Api::NotificationsController < ApplicationController
  before_action :assure_logged_in

  def index
    @notifications = Notification.includes({notifyable: [:user, {harvst: [:user]}]})
                                  .order(created_at: :desc)
                                  .includes(:user)
                                  .where(user_id: current_user.id)
                                  .limit(15)
  end

  def create
    @notification = Notification.new(notification_params)

    if @notification.save
      Pusher.trigger('notification_channel' + current_user.id.to_s, 'new_notification', {})
      render :show
    else
      render json: @notification.errors.full_messages, status: 422
    end
  end

  def updatebatch
    @notifications = Notification.includes(:notifyable).where(user_id: current_user.id)
    @notifications.update_all(viewed: true)
    render :index
  end


  private

  def notification_params
    params.require(:notification).permit(:notifyable_type, :notifyable_id, :user_id)
  end
end
