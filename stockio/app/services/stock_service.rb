class StockService
    API_KEY = Rails.application.config.stock_api_key
    BASE_API = "https://api.twelvedata.com"

    def showall 
        api = "#{BASE_API}/stocks?country=United States&exchange=NASDAQ&apikey=#{API_KEY}"
        RestClient.get api, accept: :json
    end

end