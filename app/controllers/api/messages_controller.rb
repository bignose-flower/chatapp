class Api::MessagesController < ApplicationController
  def index
    group = Group.find(params[:group_id])
    last_message_id = params[:id]
    if ( last_message_id.nil? )
      last_message_id = 0
    end
    @messages = group.messages.includes(:user).where("id > ?", last_message_id)
    
  end
end