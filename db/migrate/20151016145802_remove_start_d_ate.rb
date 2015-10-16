class RemoveStartDAte < ActiveRecord::Migration
  def change
    remove_column :harvsts, :start_date
  end
end
