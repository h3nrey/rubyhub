FactoryBot.define do
  factory :arcade do
    name { Faker::Company.name + " Arcade" }
    theme { ["80s Retro", "Cyberpunk", "8-bit Nostalgia", "Fantasy", "Racing", "Sci-Fi", "Horror", "Anime", "Neon Lights", "Steampunk"].sample }
    description { Faker::Lorem.paragraph(sentence_count: 3) }
    online { [true, false].sample }
    association :owner, factory: :user
  end
end
