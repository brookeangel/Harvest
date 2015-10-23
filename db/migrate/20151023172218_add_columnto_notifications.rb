class AddColumntoNotifications < ActiveRecord::Migration
  def change
    add_column :notifications, :notiying_user_id, :integer
  end

end
