class GridWidgetsController < ApplicationController
  before_action :set_grid_widget, only: %i[show update destroy]

  # GET /grids
  def index
    @grid_widgets = GridWidget.all

    render json: @grid_widgets
  end

  # GET /grids/1
  def show
    render json: @grid_widget
  end

  # POST /grids
  def create
    @grid_widget = GridWidget.new(grid_widget_params)

    if @grid_widget.save
      render json: @grid_widget, status: :created, location: @grid_widget
    else
      render json: @grid_widget.errors, status: 422
    end
  end

  # PATCH/PUT /grids/1
  def update
    if @grid_widget.update(grid_widget_params)
      render json: @grid_widget
    else
      render json: @grid_widget.errors, status: 422
    end
  end

  # DELETE /grids/1
  def destroy
    @grid_widget.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_grid_widget
    @grid_widget = GridWidget.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def grid_widget_params
    params.require(:grid_widget).permit(:position, :length, :width, :grid_id, :widget_id)
  end
end
