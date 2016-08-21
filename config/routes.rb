Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resource :session, only: [:create, :destroy]
    resources :users, only: [:create, :update, :index, :show] do
      resources :harvsts, only: [:index]
    end

    resources :harvsts, only: [:create, :update, :show, :index, :destroy]
  end

  root 'static_pages#root'
end
