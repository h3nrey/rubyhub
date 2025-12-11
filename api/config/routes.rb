Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  # API routes
  namespace :api do
    namespace :v1 do
      post 'auth/login', to: 'auth#login'
      post 'auth/signup', to: 'auth#signup'
      
      resources :arcades do
        resources :games do
          collection do
            get 'filter_options'
          end
        end
      end
      resources :users
    end
  end

  # Defines the root path route ("/")
  # root "posts#index"
end
