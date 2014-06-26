class ParksController < ApplicationController
  def index
  end

  def search
    parameters = { term: params[:term], limit: 16 }
    render json: Yelp.client.search('Santa Monica', parameters)
  end
end
