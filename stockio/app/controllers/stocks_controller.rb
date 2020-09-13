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

    def index
        render json: @user.stocks
    end

    def show
        render json: @user.stocks.find(params[:id])
    end

    def create
        new_stock = Stock.create(params_stock)
        @user.stocks << new_stock unless @user.stocks.any? {|stock| stock["symbol"] == new_stock["symbol"]}
        render json: @user.stocks
    end

    def destroy
        stock = @user.stocks.find(params[:id])
        stock.destroy
        render json: stock
    end

    private

    def params_stock
        params.require(:stock).permit(:symbol, :name, :currency, :exchange, :country, :stock_type)
    end

end