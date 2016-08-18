Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resource :session, only: [:create, :destroy]
    resources :users, only: [:create, :update, :index, :show] do
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
