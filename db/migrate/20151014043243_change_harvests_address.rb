class ChangeHarvestsAddress < ActiveRecord::Migration
  def change
    remove_column :harvsts, :address
    add_column :harvsts, :lat, :float, index: true
    add_column :harvsts, :lng, :float, index: true
  end
end
