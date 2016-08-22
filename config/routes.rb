Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resource :session, only: [:create, :destroy]
    resources :users, only: [:create, :update, :index, :show]
    resources :harvsts, only: [:create, :show, :index, :destroy]
    resources :stars, only: [:create, :destroy]
  end

  root 'static_pages#root'
end
