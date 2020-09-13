class AddUniqueIndexToPortfolio < ActiveRecord::Migration[6.0]
  def change
    add_index :portfolios, [:user_id, :stock_id], unique: true
    #Ex:- add_index("admin_users", "username")
  end
end
