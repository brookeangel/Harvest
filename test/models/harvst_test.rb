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

require 'test_helper'

class HarvstTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
