class AddUserStocksToPortfolio < ActiveRecord::Migration[6.0]
  def change
    create_table :portfolio do |t|
      t.integer :user_id
      t.integer :stock_id
      t.timestamps
    end
    
  end
end
