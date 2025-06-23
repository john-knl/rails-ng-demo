class WidgetsController < ApplicationController
  before_action :set_widget, only: %i[show update destroy]

  # GET /widgets
  def index
    @widgets = Widget.all

    render json: @widgets
  end

  # GET /widgets/1
  def show
    render json: @widget.to_json(include: %i[grids grid_widgets])
  end

  # POST /widgets
  def create
    @widget = Widget.new(widget_params)

    if @widget.save
      render json: @widget, status: :created, location: @widget
    else
      render json: @widget.errors, status: 422
    end
  end

  # PATCH/PUT /widgets/1
  def update
    if @widget.update(widget_params)
      render json: @widget
    else
      render json: @widget.errors, status: 422
    end
  end

  # DELETE /widgets/1
  def destroy
    @widget.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_widget
    @widget = Widget.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def widget_params
    params.require(:widget).permit(:name, { results: [:name, :value, series: %i[name value]] }, { config: %i[widgetType gradient showXAxis showYAxis showLegend showXAxisLabel showYAxisLabel xAxisLabel yAxisLabel autoScale] })
  end
end
