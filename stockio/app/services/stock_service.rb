class StockService
    API_KEY = Rails.application.config.stock_api_key
    BASE_API = "https://api.twelvedata.com"

    def showall 
        api = "#{BASE_API}/stocks?country=United States&exchange=NASDAQ&apikey=#{API_KEY}"
        RestClient.get api, accept: :json
    end

    def search(stock_name)
        regex = Regexp.new("^#{stock_name}", Regexp::EXTENDED | Regexp::IGNORECASE)
        all_stocks = showall()
        stock_json = JSON.parse(all_stocks.body)["data"]
        stocks = stock_json.select {|stock| regex.match(stock["name"])}
        {data: stocks}
    end

end