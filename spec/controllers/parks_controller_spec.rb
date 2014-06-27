require 'rails_helper'

RSpec.describe ParksController, :type => :controller do


	describe "GET 'index'" do
    it "returns http success" do
      get 'index'
      expect(response).to be_success
    end
  end

  describe 'search' do
    it 'should return results' do
      get :search, expect(response).to be_success
      end
  end
end




end
