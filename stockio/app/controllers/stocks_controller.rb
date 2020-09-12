class StocksController < ApplicationController

    def initialize
        @stockService = StockService.new
    end
    
    def showall
        render json: @stockService.showall
    end

    def search
        stock_name = params[:q]
        if !stock_name.empty?
            render json: @stockService.search(stock_name) 
        else
            render json: [], status: :no_content
        end
    end
end