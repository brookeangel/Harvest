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

require 'test_helper'

class StarTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end