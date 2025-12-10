module Api
  module V1
    class ArcadesController < ApplicationController
      before_action :set_arcade, only: [:show, :update, :destroy]

      def index
        arcades = ArcadeService.new.list(filter_params)
        render json: arcades
      end

      def show
        render json: @arcade
      end

      def create
        @arcade = Arcade.new(arcade_params)

        if @arcade.save
          render json: @arcade, status: :created
        else
          render json: { errors: @arcade.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        if @arcade.update(arcade_params)
          render json: @arcade
        else
          render json: { errors: @arcade.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        @arcade.destroy
        head :no_content
      end

      private

      def set_arcade
        @arcade = Arcade.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'Arcade not found' }, status: :not_found
      end

      def arcade_params
        params.require(:arcade).permit(:name, :theme, :description, :online)
      end

      def filter_params
        params.permit(:page, :per_page, :search, :online, :theme)
      end
    end
  end
end
