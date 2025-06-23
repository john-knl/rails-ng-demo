class GridsController < ApplicationController
  before_action :set_grid, only: %i[show update destroy]

  # GET /grids
  def index
    @grids = Grid.all

    render json: @grids
  end

  # GET /grids/1
  def show
    render json: @grid.to_json(include: %i[layouts layout_grids grid_widgets widgets])
  end

  # POST /grids
  def create
    @grid = Grid.new(grid_params)

    if @grid.save
      render json: @grid, status: :created, location: @grid
    else
      render json: @grid.errors, status: 422
    end
  end

  # PATCH/PUT /grids/1
  def update
    if @grid.update(grid_params)
      render json: @grid
    else
      render json: @grid.errors, status: 422
    end
  end

  # DELETE /grids/1
  def destroy
    @grid.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_grid
    @grid = Grid.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def grid_params
    params.require(:grid).permit(:name, :title, :col, :size)
  end
end
