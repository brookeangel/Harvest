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

require 'test_helper'

class HarvstTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
