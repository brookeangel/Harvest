class FixColName < ActiveRecord::Migration
  def change
    rename_column :notifications, :notiying_user_id, :notifying_user_id
  end
end
