# == Schema Information
#
# Table name: harvsts
#
#  id          :integer          not null, primary key
#  user_id     :integer          not null
#  title       :string           not null
#  description :text             not null
#  address     :string           not null
#  privacy     :string           not null
#  start_date  :date
#  end_date    :date
#  image_url   :string
#  contact     :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Harvst < ActiveRecord::Base
  validates :title, :lat, :lng, :description, :privacy, :contact, null: false
  validates :privacy, inclusion: { in: ["public", "private"] }

  belongs_to :user

  def self.public_harvsts
    self.where("privacy = 'public'")
  end
end
