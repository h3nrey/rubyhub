class Arcade < ApplicationRecord
  # Associations
  belongs_to :owner, class_name: 'User'

  # Validations
  validates :name, presence: true, uniqueness: true
  validates :theme, presence: true

  # Scopes
  scope :online, -> { where(online: true) }
  scope :offline, -> { where(online: false) }
  scope :by_theme, ->(theme) { where(theme: theme) }

  # Instance methods
  def status
    online? ? 'Online' : 'Offline'
  end
end
