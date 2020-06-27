class Api::MessagesController < ApplicationController
  def index
    group = Group.find(params[:group_id])
    last_message_id = params[:id]
    if ( last_message_id? )
      return @messages = group.messages.includes(:user).where("id > ?", last_message_id)
    end
    last_message_id = 0
  end
end