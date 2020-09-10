class UsersController < ApplicationController

    before_action :authorize, except: [:signup, :login]

    def signup
        user = User.create(user_params)
        if user.valid?
            token = encode_token({user_id: user.id})
            render json: {user: @user, token: token}
        else
            render json: {message: user.error.full_messages}, status: :internal_server_error
        end
    end

    def login
        user = User.find_by(username: params[:username])

        if user && user.authenticate(params[:password]) 
            token = encode_token({user_id: user.id})
            render json: {user: @user, token: token}
        else
            render json: {message: user.error.full_messages}, status: :unauthorized
        end
    end

    private 

    def user_params
        params.permit(:username, :email, :password, :dob)
    end

end
