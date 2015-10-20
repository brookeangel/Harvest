class CreateShares < ActiveRecord::Migration
  def change
    create_table :shares do |t|
      t.integer :harvst_id, null: false
      t.integer :user_id, null: false
      t.timestamps null: false
    end

    add_index :shares, [:harvst_id, :user_id], unique: true
    add_index :shares, :user_id
  end
end
