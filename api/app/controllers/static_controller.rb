class StaticController < ApplicationController
  def index
    send_file Rails.root.join('public', 'index.html'), type: 'text/html', disposition: 'inline'
  end
end
