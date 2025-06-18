# frozen_string_literal: true

mount ActionCable.server => '/cable'

Rails.application.routes.draw do

  constraints subdomain: 'api' do
    resources :widgets
    resources :grids
    resources :layouts
    resources :layout_grids
    resources :grid_widgets
  end

  get '/health', to: 'health#index'
  root to: redirect(Rails.root.to_s)
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
