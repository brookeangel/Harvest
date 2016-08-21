# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  affiliation     :string           not null
#  website_url     :string
#  profile_img_url :string
#  description     :text
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ActiveRecord::Base
  after_initialize :ensure_session_token
  validates :session_token, :password_digest, :username,
    presence: true, uniqueness: true
  validates :password, confirmation: true, length: {minimum: 6, allow_nil: true}
  validates :username, length: {minimum: 6, maximum: 20}
  validates :affiliation, inclusion: { in: ["individual", "organization"]}

  attr_reader :password

  has_many :harvsts, dependent: :destroy

  def reset_session_token!
    self.session_token = User.generate_session_token
    save!
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def self.find_by_credentials(username, password)
    user = User.find_by_username(username)
    return user if user && user.is_password?(password)
  end

  private

  def User.generate_session_token
    SecureRandom::urlsafe_base64(16)
  end

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end

end
