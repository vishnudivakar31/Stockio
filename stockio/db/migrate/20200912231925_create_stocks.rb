class CreateStocks < ActiveRecord::Migration[6.0]
  def change
    create_table :stocks do |t|
      t.string :symbol
      t.string :name
      t.string :currency
      t.string :exchange
      t.string :country
      t.string :type

      t.timestamps
    end
  end
end
