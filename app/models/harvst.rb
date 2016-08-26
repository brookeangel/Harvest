# == Schema Information
#
# Table name: harvsts
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  title      :string           not null
#  address    :string           not null
#  lat        :float            not null
#  lng        :float            not null
#  image_url  :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Harvst < ActiveRecord::Base
  validates :address, :title, :lat, :lng, presence: true
  validates :title, length: {maximum: 20}

  before_save :default_image_url
  belongs_to :user
  has_many :stars, dependent: :destroy

  def self.in_bounds(bounds, privacy = "public")
    sql_bounds = {
      swlat: bounds["southWest"]["lat"].to_f,
      swlng: bounds["southWest"]["lng"].to_f,
      nelat: bounds["northEast"]["lat"].to_f,
      nelng: bounds["northEast"]["lng"].to_f
    }

    Harvst.where(<<-SQL, sql_bounds)
      (harvsts.lng BETWEEN :swlng AND :nelng) AND
      (harvsts.lat BETWEEN :swlat AND :nelat)
    SQL
  end

  def is_starred?(user)
    stars.exists?(user: user)
  end

  private

  def default_image_url
    if !self.image_url || self.image_url == ""
      self.image_url = "http://res.cloudinary.com/harvst/image/upload/c_pad,h_500,w_500/v1444948106/carrot_shybg0.jpg"
    end
  end
end
