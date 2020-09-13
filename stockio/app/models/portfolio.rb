class Portfolio < ApplicationRecord
    belongs_to :user
    belongs_to :stock
    validates_uniqueness_of :stock_id, :scope => :user_id
end