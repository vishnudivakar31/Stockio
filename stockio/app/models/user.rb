class User < ApplicationRecord
    has_secure_password
    validates :username, presence: true, uniqueness: true, length: {minimum:6, maximum:15}
    validates :password, presence: true, length: {minimum:6}
    validates :email, presence: true, uniqueness: true, format: /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
    has_many :portfolio, :dependent => :destroy
    has_many :stocks, -> {distinct}, through: :portfolio
end
