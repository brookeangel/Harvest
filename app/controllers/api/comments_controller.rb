class Api::CommentsController < ApplicationController
  def index
    @comments = Comment.includes(:user).where(harvst_id: params[:harvst_id])
  end

  def create
    @comment = Comment.new(comment_params)
    @comment.user_id = current_user.id

    if @comment.save
      render :show
    else
      render json: @comment.errors.full_messages, status: 422
    end
  end

  def destroy
    @comment = Comment.find(params[:id])

    if @comment
      @comment.destroy
      render :show
    else
      render json: "Comment does not exist.", status: 422
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:body, :harvst_id)
  end

end
