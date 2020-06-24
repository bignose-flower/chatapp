require 'rails_helper'

RSpec.describe Message, type: :model do
  describe '#create' do
    context 'can save messages' do
      it 'valid with content' do
        expect(build(:message, image: nil)).to be_valid
      end
    end
  end
end