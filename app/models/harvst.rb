
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
  validates :address, :title, :lat, :lng, :description, :privacy, :contact, null: false
  validates :title, length: {minimum: 1}
  validates :privacy, inclusion: { in: ["public", "private"] }

  belongs_to :user

  def self.in_bounds(bounds, privacy = "public")
    sql_bounds = {
      swlat: bounds["southWest"]["lat"].to_f,
      swlng: bounds["southWest"]["lng"].to_f,
      nelat: bounds["northEast"]["lat"].to_f,
      nelng: bounds["northEast"]["lng"].to_f,
      privacy: privacy
    }

    Harvst.where(<<-SQL, sql_bounds)
      (harvsts.lng BETWEEN :swlng AND :nelng) AND
      (harvsts.lat BETWEEN :swlat AND :nelat) AND
      (harvsts.privacy = :privacy)
    SQL
  end
end
