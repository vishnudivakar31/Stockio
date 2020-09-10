class ApplicationController < ActionController::API
    
    before_action :authorize
    
    SECRET_KEY = "stockio-secret-io"

    def encode_token(token)
        JWT.encode(token, SECRET_KEY)
    end

    def auth_header
        request.headers['Authorization']
    end
    
    def decoded_token
        if auth_header
            token = auth_header.split(' ')[1]
            begin
                JWT.decode(token, SECRET_KEY, true, algorithm: 'HS256')
            rescue JWT::DecodeError
                nil
            end 
        end
    end
    
    def login_user?
        if decoded_token
            user_id = decoded_token[0]['user_id']
            @user = User.find(user_id)
            return true
        end
        return false
    end

    def authorize
        render json: {message: "please log in"}, status: :unauthorized unless login_user?
    end

end
