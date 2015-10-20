# == Schema Information
#
# Table name: shares
#
#  id         :integer          not null, primary key
#  harvst_id  :integer          not null
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Share < ActiveRecord::Base
  validates :harvst_id, :user_id, presence: true
  validates :harvst_id, uniqueness: {scope: :user_id}

  belongs_to :user
  belongs_to :harvst
  has_many :notifications, as: :notifyable

end
