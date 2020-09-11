Rails.application.routes.draw do
  ######### USER MANAGEMENT #############
  post "/login", to: "users#login"
  post "/signup", to: "users#signup"
  get "/user/show", to: "users#show"
  put "/user/update", to: "users#update"
  patch "/user/update", to: "users#update"
  delete "/user", to: "users#delete"
  #######################################
  resources :stocks
end
