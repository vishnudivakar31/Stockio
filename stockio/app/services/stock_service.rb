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

    def fetchCurrentRate(stock_list)
        symbols_list = ""
        stock_list = stock_list[0, 7]
        stock_list.each {|stock| symbols_list += stock[:symbol] + ","}
        symbols_list = symbols_list.delete_suffix(',')
        api = "#{BASE_API}/time_series?symbol=#{symbols_list}&interval=1min&apikey=#{API_KEY}"
        current_rate = RestClient.get api, accept: :json
        json_data = JSON.parse(current_rate)
        createCurrentRate(json_data)
    end

    private

    def createCurrentRate(json_data)
        response = []
        json_data.each do |key, value|
            stock = {}
            stock[:symbol] = key
            stock[:meta] = value["meta"]
            stock[:current_rate] = value["values"][0]
            stock[:history] = value["values"]
            response << stock
        end
        response
    end

end