class CreateGames < ActiveRecord::Migration[7.0]
  def change
    create_table :games do |t|
      t.string :name, null: false
      t.string :genre
      t.string :developer
      t.integer :release_year
      t.references :arcade, null: false, foreign_key: true
      t.text :description
      t.decimal :rating, precision: 3, scale: 1
      t.string :cover_image

      t.timestamps
    end

    add_index :games, :name
    add_index :games, :genre
    add_index :games, :developer
  end
end
