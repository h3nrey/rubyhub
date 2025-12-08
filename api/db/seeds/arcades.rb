require 'factory_bot_rails'

# Clear existing data
Arcade.destroy_all
User.destroy_all

# Create users first
users = []
5.times do
  users << FactoryBot.create(:user)
end

puts "Created #{User.count} users"

# Create featured arcades with specific themes
featured_arcades = [
  { name: "Neon Palace", theme: "80s Retro", online: true },
  { name: "Cyber Arena", theme: "Cyberpunk", online: true },
  { name: "Pixel Paradise", theme: "8-bit Nostalgia", online: false },
  { name: "Dragon's Den", theme: "Fantasy", online: true },
  { name: "Speed Zone", theme: "Racing", online: true }
]

featured_arcades.each do |attrs|
  FactoryBot.create(:arcade, attrs.merge(owner: users.sample))
end

# Create 10 random arcades
10.times do
  FactoryBot.create(:arcade, owner: users.sample)
end

puts "Created #{Arcade.count} arcades"
