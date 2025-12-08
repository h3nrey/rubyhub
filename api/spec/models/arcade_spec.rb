require 'rails_helper'

RSpec.describe Arcade, type: :model do
  describe 'validations' do
    it 'is valid with valid attributes' do
      arcade = build(:arcade)
      expect(arcade).to be_valid
    end

    it 'is not valid without a name' do
      arcade = build(:arcade, name: nil)
      expect(arcade).not_to be_valid
      expect(arcade.errors[:name]).to include("can't be blank")
    end

    it 'is not valid without a theme' do
      arcade = build(:arcade, theme: nil)
      expect(arcade).not_to be_valid
      expect(arcade.errors[:theme]).to include("can't be blank")
    end

    it 'is not valid with a duplicate name' do
      create(:arcade, name: 'Neon Palace')
      arcade = build(:arcade, name: 'Neon Palace')
      expect(arcade).not_to be_valid
      expect(arcade.errors[:name]).to include("has already been taken")
    end

    it 'is valid without a description' do
      arcade = build(:arcade, description: nil)
      expect(arcade).to be_valid
    end
  end

  describe 'scopes' do
    describe '.online' do
      it 'returns only online arcades' do
        online_arcade = create(:arcade, online: true)
        offline_arcade = create(:arcade, online: false)
        
        expect(Arcade.online).to include(online_arcade)
        expect(Arcade.online).not_to include(offline_arcade)
      end
    end

    describe '.offline' do
      it 'returns only offline arcades' do
        online_arcade = create(:arcade, online: true)
        offline_arcade = create(:arcade, online: false)
        
        expect(Arcade.offline).to include(offline_arcade)
        expect(Arcade.offline).not_to include(online_arcade)
      end
    end

    describe '.by_theme' do
      it 'returns arcades filtered by theme' do
        retro_arcade = create(:arcade, theme: '80s Retro')
        cyber_arcade = create(:arcade, theme: 'Cyberpunk')
        
        expect(Arcade.by_theme('80s Retro')).to include(retro_arcade)
        expect(Arcade.by_theme('80s Retro')).not_to include(cyber_arcade)
      end
    end
  end

  describe 'instance methods' do
    describe '#online?' do
      it 'returns true when arcade is online' do
        arcade = build(:arcade, online: true)
        expect(arcade.online?).to be true
      end

      it 'returns false when arcade is offline' do
        arcade = build(:arcade, online: false)
        expect(arcade.online?).to be false
      end
    end

    describe '#status' do
      it 'returns "Online" when arcade is online' do
        arcade = build(:arcade, online: true)
        expect(arcade.status).to eq('Online')
      end

      it 'returns "Offline" when arcade is offline' do
        arcade = build(:arcade, online: false)
        expect(arcade.status).to eq('Offline')
      end
    end
  end
end
