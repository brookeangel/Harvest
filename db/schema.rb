# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151020030843) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.integer  "harvst_id",  null: false
    t.text     "body",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "comments", ["harvst_id"], name: "index_comments_on_harvst_id", using: :btree
  add_index "comments", ["user_id"], name: "index_comments_on_user_id", using: :btree

  create_table "harvsts", force: :cascade do |t|
    t.integer  "user_id",     null: false
    t.string   "title",       null: false
    t.text     "description", null: false
    t.string   "privacy",     null: false
    t.date     "end_date"
    t.string   "image_url"
    t.string   "contact"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.float    "lat"
    t.float    "lng"
    t.string   "address",     null: false
  end

  add_index "harvsts", ["user_id"], name: "index_harvsts_on_user_id", using: :btree

  create_table "shares", force: :cascade do |t|
    t.integer  "harvst_id",  null: false
    t.integer  "user_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "shares", ["harvst_id", "user_id"], name: "index_shares_on_harvst_id_and_user_id", unique: true, using: :btree
  add_index "shares", ["user_id"], name: "index_shares_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.string   "affiliation",     null: false
    t.string   "website_url"
    t.string   "profile_img_url"
    t.text     "description"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
