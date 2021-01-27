class HomeController < ApplicationController
  def index; end

  # example of link_to method delete (optional confirm) via stimulus instead of rails_ujs
  def delete
    render plain: "deleted"
  end
end
