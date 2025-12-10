class ArcadeService
  def initialize
    @per_page = 9
  end

  def list(filters = {})
    filters = filters.to_h.symbolize_keys if filters.respond_to?(:to_h)
    
    page = (filters[:page] || 1).to_i
    per_page = (filters[:per_page] || @per_page).to_i
    search = filters[:search]
    online = filters[:online]
    theme = filters[:theme]

    arcades = Arcade.all

    arcades = arcades.by_search(search) if search.present?
    arcades = arcades.where(online: online) if online.present?
    arcades = arcades.by_theme(theme) if theme.present?

    total = arcades.count
    last_page = (total / per_page.to_f).ceil

    data = arcades.limit(per_page).offset((page - 1) * per_page)

    {
      data: data,
      total: total,
      page: page,
      per_page: per_page,
      last_page: last_page
    }
  end
end
