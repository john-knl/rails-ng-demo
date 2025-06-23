class LayoutsController < ApplicationController
  before_action :set_layout, only: %i[show update destroy]

  # GET /layouts
  def index
    @layouts = Layout.all

    render json: @layouts
  end

  # GET /layouts/1
  def show
    render json: @layout.to_json(include: %i[grids layout_grids])
  end

  # POST /layouts
  def create
    @layout = Layout.new(layout_params)

    if @layout.save
      render json: @layout, status: :created, location: @layout
    else
      render json: @layout.errors, status: 422
    end
  end

  # PATCH/PUT /layouts/1
  def update
    if @layout.update(layout_params)
      render json: @layout
    else
      render json: @layout.errors, status: 422
    end
  end

  # DELETE /layouts/1
  def destroy
    @layout.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_layout
    @layout = Layout.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def layout_params
    params.require(:layout).permit(:name, :background, :duration)
  end
end
