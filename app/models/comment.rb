# == Schema Information
#
# Table name: comments
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  harvst_id  :integer          not null
#  body       :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Comment < ActiveRecord::Base
  validates :user_id, :harvst_id, :body, presence: true

  belongs_to :user
  belongs_to :harvst
  has_many :notifications, as: :notifyable
end
