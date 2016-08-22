# == Schema Information
#
# Table name: stars
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  harvst_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Star < ActiveRecord::Base
  validates :user, :harvst, presence: true
  validates :harvst_id, uniqueness: { scope: :user_id }
  belongs_to :user
  belongs_to :harvst
end
