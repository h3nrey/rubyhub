class CreateArcades < ActiveRecord::Migration[8.1]
  def change
    create_table :arcades do |t|
      t.string :name
      t.string :theme
      t.text :description
      t.boolean :online

      t.timestamps
    end
  end
end
