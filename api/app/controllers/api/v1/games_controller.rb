module Api
  module V1
    class GamesController < ApplicationController
      before_action :set_arcade
      before_action :set_game, only: [:show, :update, :destroy]

      def index
        service = GameService.new(@arcade)
        filters = filter_params
        result = service.list(filters)

        render json: result
      end

      def filter_options
        games = @arcade.games
        genres = games.distinct.pluck(:genre).compact.sort
        developers = games.distinct.pluck(:developer).compact.sort

        render json: {
          genres: genres,
          developers: developers
        }
      end

      def show
        render json: @game
      end

      def create
        @game = @arcade.games.new(game_params)

        if @game.save
          render json: @game, status: :created
        else
          render json: { errors: @game.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        if @game.update(game_params)
          render json: @game
        else
          render json: { errors: @game.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        @game.destroy
        head :no_content
      end

      private

      def set_arcade
        @arcade = Arcade.find(params[:arcade_id])
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'Arcade not found' }, status: :not_found
      end

      def set_game
        @game = @arcade.games.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'Game not found' }, status: :not_found
      end

      def game_params
        params.require(:game).permit(:name, :genre, :developer, :release_year, :description, :rating, :cover_image)
      end

      def filter_params
        params.permit(:page, :per_page, :search, :genre, :developer)
      end
    end
  end
end
