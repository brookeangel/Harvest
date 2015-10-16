Rails.application.routes.draw do

  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:update, :index, :show] do
      resources :harvsts, only: [:index]
    end
    resources :harvsts, only: [:create, :update, :show, :index, :destroy]
  end

  get "/", to: 'static_pages#root'

  root 'static_pages#root'
end
