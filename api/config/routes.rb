Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  # API routes
  namespace :api do
    namespace :v1 do
      resources :arcades
      resources :users
    end
  end

  # Defines the root path route ("/")
  # root "posts#index"
end
