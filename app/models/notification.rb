# == Schema Information
#
# Table name: notifications
#
#  id                :integer          not null, primary key
#  notifyable_id     :integer
#  notifyable_type   :string
#  user_id           :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  viewed            :boolean          default(FALSE)
#  notifying_user_id :integer
#

class Notification < ActiveRecord::Base
  validates :notifyable_id, :notifying_user_id, :notifyable_type, :user_id, presence: true

  belongs_to :notifyable, polymorphic: true
  belongs_to :user
  belongs_to(
    :notifying_user,
    class_name: "User",
    foreign_key: :notifying_user_id,
    primary_key: :id
  )
end
