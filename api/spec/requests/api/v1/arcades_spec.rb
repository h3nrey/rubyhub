require 'rails_helper'

RSpec.describe 'Arcades API', type: :request do
  describe 'GET /api/v1/arcades' do
    let!(:arcades) { create_list(:arcade, 5) }

    it 'returns all arcades' do
      get '/api/v1/arcades'
      
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body).size).to eq(5)
    end

    it 'returns arcades with correct structure' do
      get '/api/v1/arcades'
      
      json_response = JSON.parse(response.body)
      arcade = json_response.first
      
      expect(arcade).to include(
        'id',
        'name',
        'theme',
        'description',
        'online',
        'created_at',
        'updated_at'
      )
    end

    context 'when filtering by online status' do
      let!(:online_arcades) { create_list(:arcade, 3, online: true) }
      let!(:offline_arcades) { create_list(:arcade, 2, online: false) }

      it 'returns only online arcades when online=true' do
        get '/api/v1/arcades', params: { online: true }
        
        expect(response).to have_http_status(:ok)
        json_response = JSON.parse(response.body)
        expect(json_response.size).to eq(3)
        expect(json_response.all? { |a| a['online'] == true }).to be true
      end

      it 'returns only offline arcades when online=false' do
        get '/api/v1/arcades', params: { online: false }
        
        expect(response).to have_http_status(:ok)
        json_response = JSON.parse(response.body)
        expect(json_response.size).to eq(2)
        expect(json_response.all? { |a| a['online'] == false }).to be true
      end
    end

    context 'when filtering by theme' do
      let!(:retro_arcades) { create_list(:arcade, 2, theme: '80s Retro') }
      let!(:cyber_arcades) { create_list(:arcade, 3, theme: 'Cyberpunk') }

      it 'returns only arcades with specified theme' do
        get '/api/v1/arcades', params: { theme: '80s Retro' }
        
        expect(response).to have_http_status(:ok)
        json_response = JSON.parse(response.body)
        expect(json_response.size).to eq(2)
        expect(json_response.all? { |a| a['theme'] == '80s Retro' }).to be true
      end
    end
  end

  describe 'GET /api/v1/arcades/:id' do
    let!(:arcade) { create(:arcade) }

    it 'returns a specific arcade' do
      get "/api/v1/arcades/#{arcade.id}"
      
      expect(response).to have_http_status(:ok)
      json_response = JSON.parse(response.body)
      expect(json_response['id']).to eq(arcade.id)
      expect(json_response['name']).to eq(arcade.name)
    end

    it 'returns 404 when arcade not found' do
      get '/api/v1/arcades/999999'
      
      expect(response).to have_http_status(:not_found)
    end
  end

  describe 'POST /api/v1/arcades' do
    let(:valid_attributes) do
      {
        name: 'New Arcade',
        theme: 'Sci-Fi',
        description: 'A futuristic arcade',
        online: true
      }
    end

    let(:invalid_attributes) do
      {
        name: '',
        theme: '',
        description: 'Invalid arcade'
      }
    end

    it 'creates a new arcade with valid attributes' do
      expect {
        post '/api/v1/arcades', params: { arcade: valid_attributes }
      }.to change(Arcade, :count).by(1)

      expect(response).to have_http_status(:created)
      json_response = JSON.parse(response.body)
      expect(json_response['name']).to eq('New Arcade')
      expect(json_response['theme']).to eq('Sci-Fi')
    end

    it 'returns unprocessable_entity with invalid attributes' do
      post '/api/v1/arcades', params: { arcade: invalid_attributes }

      expect(response).to have_http_status(:unprocessable_entity)
      json_response = JSON.parse(response.body)
      expect(json_response).to have_key('errors')
    end
  end

  describe 'PUT /api/v1/arcades/:id' do
    let!(:arcade) { create(:arcade, name: 'Old Name', online: false) }
    let(:valid_update_attributes) do
      {
        name: 'Updated Name',
        online: true
      }
    end

    let(:invalid_update_attributes) do
      {
        name: '',
        theme: ''
      }
    end

    it 'updates the arcade with valid attributes' do
      put "/api/v1/arcades/#{arcade.id}", params: { arcade: valid_update_attributes }

      expect(response).to have_http_status(:ok)
      json_response = JSON.parse(response.body)
      expect(json_response['name']).to eq('Updated Name')
      expect(json_response['online']).to be true
    end

    it 'returns unprocessable_entity with invalid attributes' do
      put "/api/v1/arcades/#{arcade.id}", params: { arcade: invalid_update_attributes }

      expect(response).to have_http_status(:unprocessable_entity)
      json_response = JSON.parse(response.body)
      expect(json_response).to have_key('errors')
    end

    it 'returns 404 when arcade not found' do
      put '/api/v1/arcades/999999', params: { arcade: valid_update_attributes }

      expect(response).to have_http_status(:not_found)
    end
  end

  describe 'DELETE /api/v1/arcades/:id' do
    let!(:arcade) { create(:arcade) }

    it 'deletes the arcade' do
      expect {
        delete "/api/v1/arcades/#{arcade.id}"
      }.to change(Arcade, :count).by(-1)

      expect(response).to have_http_status(:no_content)
    end

    it 'returns 404 when arcade not found' do
      delete '/api/v1/arcades/999999'

      expect(response).to have_http_status(:not_found)
    end
  end
end
