class GameService
  def initialize(arcade)
    @arcade = arcade
    @per_page = 12
  end

  def list(filters = {})
    filters = filters.to_h.symbolize_keys if filters.respond_to?(:to_h)
    
    page = (filters[:page] || 1).to_i
    per_page = (filters[:per_page] || @per_page).to_i
    search = filters[:search]
    genre = filters[:genre]
    developer = filters[:developer]

    games = @arcade.games

    games = games.by_search(search) if search.present?
    games = games.by_genre(genre) if genre.present?
    games = games.by_developer(developer) if developer.present?

    games = games.recent

    total = games.count
    last_page = (total / per_page.to_f).ceil

    data = games.limit(per_page).offset((page - 1) * per_page)

    {
      data: data,
      total: total,
      page: page,
      per_page: per_page,
      last_page: last_page
    }
  end
end
