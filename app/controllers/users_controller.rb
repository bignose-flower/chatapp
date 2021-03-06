class UsersController < ApplicationController
  def index
    @users = User.search(params[:keyword], params[:member_ids], current_user.id)
    respond_to do |format|
      format.json
    end
  end

  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  def destroy
  end

  private
  def user_params
    params.require(:user).permit(:name, :email)
  end
end
