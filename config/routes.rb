Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  # example of link_to method delete (optional confirm) via stimulus instead of rails_ujs
  delete "delete" => "home#delete"

  root to: 'home#index'
end
