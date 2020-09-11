class StocksController < ApplicationController
    def showall
        stockService = StockService.new
        render json: stockService.showall
    end
end