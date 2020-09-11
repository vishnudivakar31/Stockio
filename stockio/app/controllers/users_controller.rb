class UsersController < ApplicationController

    before_action :authorize, except: [:signup, :login]

    AUTHORIZATION_HEADER = "Authorization"
    TOKEN_EXPIRATION_HEADER = "Token Expiring Time"
    TOKEN_PREFIX = "Bearer"

    def signup
        user = User.create(user_params)
        if user.valid?
            token = "#{TOKEN_PREFIX} #{encode_token({user_id: user.id})}"
            response.headers[AUTHORIZATION_HEADER] = token
            response.headers[TOKEN_EXPIRATION_HEADER] = token_expiry_time
            render json: user, except: [:password_digest]
        else
            render json: {messages: user.errors.full_messages}, status: :internal_server_error
        end
    end

    def login
        user = User.find_by(username: params[:username])

        if user && user.authenticate(params[:password]) 
            token = "#{TOKEN_PREFIX} #{encode_token({user_id: user.id})}"
            response.headers[AUTHORIZATION_HEADER] = token
            response.headers[TOKEN_EXPIRATION_HEADER] = token_expiry_time
            render json: user, except: [:password_digest]
        else
            render json: {messages: "unable to find account"}, status: :unauthorized
        end
    end

    def show
        render json: @user, except: :password_digest
    end

    def update
        if @user.update(user_params)
            render json: @user, except: :password_digest
        else
            render json: {messages: @user.errors.full_messages}, status: :internal_server_error
        end
    end

    def delete
        if @user.destroy 
            render json: {message: "account deleted"}
        else
            render json: {messages: @user.errors.full_messages}, status: :internal_server_error
        end
    end

    private 

    def user_params
        params.except(:user).permit(:username, :password, :email, :dob)
    end

    def token_expiry_time
        (Time.now.to_i + EXPIRY_TIME_IN_SECONDS) * (10 ** 3)
    end

end
