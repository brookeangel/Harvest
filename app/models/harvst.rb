# == Schema Information
#
# Table name: harvsts
#
#  id          :integer          not null, primary key
#  user_id     :integer          not null
#  title       :string           not null
#  description :text             not null
#  privacy     :string           not null
#  end_date    :date
#  image_url   :string
#  contact     :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  lat         :float
#  lng         :float
#  address     :string           not null
#

class Harvst < ActiveRecord::Base
  validates :address, :title, :lat, :lng, :description, :privacy, null: false
  validates :title, length: {minimum: 1, maximum: 40}
  validates :address, length: {maximum: 255}
  validates :privacy, inclusion: { in: ["public", "private"] }

  before_save :default_image_url

  belongs_to :user
  has_many :shares

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

  def private?
    self.privacy == 'private'
  end

  private

  def default_image_url
    if !self.image_url || self.image_url == ""
      self.image_url = "http://res.cloudinary.com/harvst/image/upload/c_pad,h_500,w_500/v1444948106/carrot_shybg0.jpg"
    end
  end
end
