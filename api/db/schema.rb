ActiveRecord::Schema[8.1].define(version: 2025_12_08_152507) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "arcades", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.text "description"
    t.string "name"
    t.boolean "online"
    t.string "theme"
    t.datetime "updated_at", null: false
  end
end
