class CreateHarvsts < ActiveRecord::Migration
  def change
    create_table :harvsts do |t|
      t.integer :user_id, null: false
      t.string :title, null: false
      t.text :description, null: false
      t.string :address, null: false
      t.string :privacy, null: false
      t.date :start_date
      t.date :end_date
      t.string :image_url
      t.string :contact, null: false
      t.timestamps null: false
    end

    add_index :harvsts, :user_id
  end
end
