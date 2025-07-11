require 'rails_helper'
require 'common_setup'

# This spec was generated by rspec-rails when you ran the scaffold generator.
# It demonstrates how one might use RSpec to test the controller code that
# was generated by Rails when you ran the scaffold generator.
#
# It assumes that the implementation code is generated by the rails scaffold
# generator. If you are using any extension libraries to generate different
# controller code, this generated spec may or may not pass.
#
# It only uses APIs available in rails and/or rspec-rails. There are a number
# of tools you can use to make these specs even more expressive, but we're
# sticking to rails and rspec-rails APIs to keep things simple and stable.

RSpec.describe "/layout_grids", type: :request do
  include_context 'layout'
  include_context 'grid'
  # This should return the minimal set of attributes required to create a valid
  # LayoutGrid. As you add validations to LayoutGrid, be sure to
  # adjust the attributes here as well.
  let(:valid_attributes) {
    { position: 0, layout_id: @layout.id, grid_id: @grid.id }
  }

  let(:invalid_attributes) {
    { position: -1, layout_id: @layout.id, grid_id: @grid.id }
  }

  # This should return the minimal set of values that should be in the headers
  # in order to pass any filters (e.g. authentication) defined in
  # LayoutGridsController, or in your router and rack
  # middleware. Be sure to keep this updated too.
  let(:valid_headers) {
    {}
  }

  describe "GET /index" do
    it "renders a successful response" do
      LayoutGrid.create! valid_attributes
      get layout_grids_url, headers: valid_headers, as: :json
      expect(response).to be_successful
    end
  end

  describe "GET /show" do
    it "renders a successful response" do
      layout_grid = LayoutGrid.create! valid_attributes
      get layout_grid_url(layout_grid), as: :json
      expect(response).to be_successful
    end
  end

  describe "POST /create" do
    context "with valid parameters" do
      it "creates a new LayoutGrid" do
        expect {
          post layout_grids_url,
               params: { layout_grid: valid_attributes }, headers: valid_headers, as: :json
        }.to change(LayoutGrid, :count).by(1)
      end

      it "renders a JSON response with the new layout_grid" do
        post layout_grids_url,
             params: { layout_grid: valid_attributes }, headers: valid_headers, as: :json
        expect(response).to have_http_status(:created)
        expect(response.content_type).to match(a_string_including("application/json; charset=utf-8"))
      end
    end

    context "with invalid parameters" do
      it "does not create a new LayoutGrid" do
        expect {
          post layout_grids_url,
               params: { layout_grid: invalid_attributes }, as: :json
        }.to change(LayoutGrid, :count).by(0)
      end

      it "renders a JSON response with errors for the new layout_grid" do
        post layout_grids_url,
             params: { layout_grid: invalid_attributes }, headers: valid_headers, as: :json
        expect(response).to have_http_status(422)
        expect(response.content_type).to eq("application/json; charset=utf-8")
      end
    end
  end

  describe "PATCH /update" do
    context "with valid parameters" do
      let(:new_attributes) {
        { position: 1, layout_id: @layout.id, grid_id: @grid.id }
      }

      it "updates the requested layout_grid" do
        layout_grid = LayoutGrid.create! valid_attributes
        patch layout_grid_url(layout_grid),
              params: { layout_grid: new_attributes }, headers: valid_headers, as: :json
        layout_grid.reload
        expect(layout_grid.position).to eq(1)
      end

      it "renders a JSON response with the layout_grid" do
        layout_grid = LayoutGrid.create! valid_attributes
        patch layout_grid_url(layout_grid),
              params: { layout_grid: new_attributes }, headers: valid_headers, as: :json
        expect(response).to have_http_status(:ok)
        expect(response.content_type).to eq("application/json; charset=utf-8")
      end
    end

    context "with invalid parameters" do
      it "renders a JSON response with errors for the layout_grid" do
        layout_grid = LayoutGrid.create! valid_attributes
        patch layout_grid_url(layout_grid),
              params: { layout_grid: invalid_attributes }, headers: valid_headers, as: :json
        expect(response).to have_http_status(422)
        expect(response.content_type).to eq("application/json; charset=utf-8")
      end
    end
  end

  describe "DELETE /destroy" do
    it "destroys the requested layout_grid" do
      layout_grid = LayoutGrid.create! valid_attributes
      expect {
        delete layout_grid_url(layout_grid), headers: valid_headers, as: :json
      }.to change(LayoutGrid, :count).by(-1)
    end
  end
end
