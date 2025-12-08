class Api::V1::AuthController < ApplicationController
  # POST /api/v1/auth/login
  def login
    user = User.find_by(email: login_params[:email])

    if user && user.authenticate(login_params[:password])
      token = JsonWebToken.encode(user_id: user.id)
      render json: {
        id: user.id,
        name: user.name,
        email: user.email,
        token: token
      }, status: :ok
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end

  # POST /api/v1/auth/signup
  def signup
    user = User.new(signup_params)

    if user.save
      token = JsonWebToken.encode(user_id: user.id)
      render json: {
        id: user.id,
        name: user.name,
        email: user.email,
        token: token
      }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def login_params
    params.require(:user).permit(:email, :password)
  end

  def signup_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end
