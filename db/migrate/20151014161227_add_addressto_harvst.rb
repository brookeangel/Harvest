class AddAddresstoHarvst < ActiveRecord::Migration
  def change
    add_column :harvsts, :address, :string, null: false 
  end
end
