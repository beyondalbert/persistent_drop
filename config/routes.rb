PersistentDrop::Application.routes.draw do
  get "welcome/index"
  put "images/resort_images"
  resources :images
  root :to => 'welcome#index'
end
