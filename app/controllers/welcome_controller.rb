class WelcomeController < ApplicationController
  def index

    @images = Image.order("sortable_position ASC").all

  end
end
