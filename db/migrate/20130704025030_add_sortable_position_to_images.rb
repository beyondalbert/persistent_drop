class AddSortablePositionToImages < ActiveRecord::Migration
  def change
    add_column :images, :sortable_position, :integer
  end
end
