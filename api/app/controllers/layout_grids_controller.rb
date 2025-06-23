class LayoutGridsController < ApplicationController
  before_action :set_layout_grid, only: %i[show update destroy]

  # GET /layout_grids
  def index
    @layout_grids = LayoutGrid.all

    render json: @layout_grids
  end

  # GET /layouts/1
  def show
    render json: @layout_grid
  end

  # POST /layouts
  def create
    @layout_grid = LayoutGrid.new(layout_grid_params)

    if @layout_grid.save
      render json: @layout_grid, status: :created, location: @layout_grid
    else
      render json: @layout_grid.errors, status: 422
    end
  end

  # PATCH/PUT /layouts/1
  def update
    if @layout_grid.update(layout_grid_params)
      render json: @layout_grid
    else
      render json: @layout_grid.errors, status: 422
    end
  end

  # DELETE /layouts/1
  def destroy
    @layout_grid.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_layout_grid
    @layout_grid = LayoutGrid.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def layout_grid_params
    params.require(:layout_grid).permit(:position, :layout_id, :grid_id)
  end
end
