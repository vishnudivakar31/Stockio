class Stock < ApplicationRecord
    has_many :portfolio, :dependent => :destroy
    has_many :users, through: :portfolio
end
