class CreateHarvsts < ActiveRecord::Migration
  def change
    create_table :harvsts do |t|
      t.integer :user_id, null: false
      t.string :title, null: false
      t.string :address, null: false
      t.float :lat, null: false
      t.float :lng, null: false
      t.string :image_url
      t.timestamps null: false
    end

    add_index :harvsts, :user_id
  end
end
