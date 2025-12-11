class Game < ApplicationRecord
  belongs_to :arcade

  validates :name, presence: true
  validates :genre, presence: true
  validates :developer, presence: true
  validates :arcade_id, presence: true

  scope :by_genre, ->(genre) { where(genre: genre) }
  scope :by_developer, ->(developer) { where(developer: developer) }
  scope :by_search, ->(query) { where('name ILIKE ? OR description ILIKE ?', "%#{query}%", "%#{query}%") }
  scope :recent, -> { order(created_at: :desc) }
end
