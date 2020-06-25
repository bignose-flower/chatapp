require 'rails_helper'

describe MessagesController do
  let(:group) { create(:group) }
  let(:user) { create(:user) }

  describe '#index' do
    context 'log in' do
      before do
        login user
        get :index, params: { group_id: group.id }
      end

      it 'assigns group' do
        expect(assigns(:group)).to eq group
      end

      it 'assigns message' do
        expect(assigns(:message)).to be_a_new(Message)
      end

      it 'renders index view' do
        expect(response).to render_template :index
      end
    end

    context 'not log in' do
      before do
        get :index, params: { group_id: group.id }
      end

      it 'redirects to index login view' do
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end

  describe '#create' do
    context 'log in' do
      context 'success to save' do
        
      end

      context 'failure to save' do
      
      end
    end

    context 'not log in' do
      
    end
  end
end