class ChangePortfolioToPortfolios < ActiveRecord::Migration[6.0]
  def change
    rename_table :portfolio, :portfolios
  end
end
