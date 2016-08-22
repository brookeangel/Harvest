class CreateStars < ActiveRecord::Migration
  def change
    create_table :stars do |t|
      t.integer :user_id, null: false
      t.integer :harvst_id, null: false
      t.timestamps null: false
    end

    add_index :stars, [:user_id, :harvst_id], unique: true
    add_index :stars, :harvst_id
  end
end
