class CreateNotifications < ActiveRecord::Migration
  def change
    create_table :notifications do |t|
      t.integer :notifyable_id
      t.string :notifyable_type
      t.integer :user_id
      t.timestamps null: false
    end

    add_index :notifications, :user_id
    add_index :notifications, :notifyable_id
  end
end
