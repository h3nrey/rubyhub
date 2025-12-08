module Api
  module V1
    class ArcadesController < ApplicationController
      before_action :set_arcade, only: [:show, :update, :destroy]

      # GET /api/v1/arcades
      def index
        @arcades = Arcade.all
        @arcades = filter_arcades(@arcades)
        
        render json: @arcades
      end

      # GET /api/v1/arcades/:id
      def show
        render json: @arcade
      end

      # POST /api/v1/arcades
      def create
        @arcade = Arcade.new(arcade_params)

        if @arcade.save
          render json: @arcade, status: :created
        else
          render json: { errors: @arcade.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # PUT/PATCH /api/v1/arcades/:id
      def update
        if @arcade.update(arcade_params)
          render json: @arcade
        else
          render json: { errors: @arcade.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # DELETE /api/v1/arcades/:id
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

      def filter_arcades(arcades)
        arcades = arcades.where(online: params[:online]) if params[:online].present?
        arcades = arcades.by_theme(params[:theme]) if params[:theme].present?
        arcades
      end
    end
  end
end
