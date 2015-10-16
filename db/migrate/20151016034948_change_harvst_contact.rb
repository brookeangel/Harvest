class ChangeHarvstContact < ActiveRecord::Migration
  def change
    change_column :harvsts, :contact, :string, null: true
  end
end
