class ChangeColumnNameToStockType < ActiveRecord::Migration[6.0]
  def change
    rename_column :stocks, :type, :stock_type
  end
end
