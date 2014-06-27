require 'rails_helper'

RSpec.describe ParksController, :type => :controller do


	describe "GET 'index'" do
    it "returns http success" do
      get 'index'
      expect(response).to be_success
    end
  end

  describe 'GET search' do
		before do
			get :search = Yelp.client.search('Santa Monica', "basketball")
		end
		it 'should be successful' do
			expect(response).to be_success
		end
		it 'renders the #show view' do
			expect(response).to render_template :index
		end
	end
end


RSpec::Matchers.define :be_valid_business_hash do
  match do |business|
    expect(business['id'].length).to be > 0
    expect(business['url']).to match_regex(/^https?:\/\/[a-z0-9]/i)
  end
end

RSpec::Matchers.define :be_valid_response_hash do
  match do |response|
    expect(response).to_not be_nil
    expect(response['businesses'] || response['basketball']).to_not be_nil
    if(response['businesses'])
      # TODO: loop in a test? - should just pick one if at all
      response['businesses'].each { |b| expect(b).to be_valid_business_hash }
    else
      true
    end
  end
end