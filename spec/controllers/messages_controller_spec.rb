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
    let(:params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message) } } 
    context 'log in' do
      before do
        login user
      end
      context 'success to save' do
        subject {
          post :create,
          params: params
        }
        it 'count up Message Model' do
          expect{ subject }.to change(Message, :count).by(1)
        end

        it 'redirects_to index view' do
          subject
          expect(response).to redirect_to(group_messages_path(group))
        end
      end

      context 'failure to save' do
        let(:invalid_params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message, content: nil, image: nil) } }
        subject {
          post :create,
          params: invalid_params
        }
        it 'not count up Message model' do
          expect{ subject }.not_to change(Message, :count)
        end

        it 'renders index view' do
          subject
          expect(response).to render_template :index
        end
      end
    end

    context 'not log in' do
      it 'redirects to index login view' do
        post :create, params: params
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
end