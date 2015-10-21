Rails.application.routes.draw do

  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:update, :index, :show] do
      resources :harvsts, only: [:index]
    end
    resources :harvsts, only: [:create, :update, :show, :index, :destroy] do
      resources :comments, only: [:index]
    end
    resources :shares, only: [:create, :index, :show, :destroy]
    resources :comments, only: [:create, :destroy]
    resources :notifications, only: [:create, :index]
  end

  get 'api/notifications/updatebatch', to: 'api/notifications#updatebatch'

  root 'static_pages#root'
end
