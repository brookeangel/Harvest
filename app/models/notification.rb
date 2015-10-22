# == Schema Information
#
# Table name: notifications
#
#  id              :integer          not null, primary key
#  notifyable_id   :integer
#  notifyable_type :string
#  user_id         :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  viewed          :boolean          default(FALSE)
#

class Notification < ActiveRecord::Base
  validates :notifyable_id, :notifyable_type, :user_id, presence: true

  belongs_to :notifyable, polymorphic: true
  belongs_to :user

  has_one :user_creating_though_share, through: :notifyable,
          source: :user, source_type: 'Share'
  has_one :user_creating_through_comment, through: :notifyable,
          source: :user, source_type: 'Comment'

end
