class NewsController < ApplicationController
    BASE_API = "https://newsapi.org/v2/top-headlines?country=us&category=business"
    API_KEY = Rails.application.config.news_api_key
    
    def topnews
        api = "#{BASE_API}&apiKey=#{API_KEY}"
        render json: (RestClient.get api, accept: :json)
    end
end