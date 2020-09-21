Rails.application.routes.draw do
  ######### USER MANAGEMENT #############
  post "/login", to: "users#login"
  post "/signup", to: "users#signup"
  get "/user/show", to: "users#show"
  put "/user/update", to: "users#update"
  patch "/user/update", to: "users#update"
  delete "/user", to: "users#delete"
  #######################################
  get "/stocks/showall", to: "stocks#showall"
  get "/stocks/search", to: "stocks#search"
  resources :stocks, only: [:index, :create, :show, :destroy]
  get "/topnews", to: "news#topnews"
  post "/stocks/bulk", to: "stocks#bulk"
  delete "/mystocks/bulk", to: "stocks#bulk_delete"
end
