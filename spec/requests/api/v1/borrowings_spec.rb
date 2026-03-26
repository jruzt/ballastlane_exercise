require "rails_helper"

RSpec.describe "Borrowings API", type: :request do
  describe "POST /api/v1/borrowings" do
    it "allows a member to borrow an available book" do
      member = create(:user)
      book = create(:book, total_copies: 2)

      sign_in member
      post "/api/v1/borrowings", params: { book_id: book.id }, as: :json

      expect(response).to have_http_status(:created)
      expect(jsonapi_data.fetch("type")).to eq("borrowing")
      expect(jsonapi_relationship(:book).fetch("id").to_i).to eq(book.id)
      expect(jsonapi_included(type: :book, id: book.id).dig("attributes", "title")).to eq(book.title)
    end

    it "prevents borrowing the same book twice" do
      member = create(:user)
      book = create(:book)
      create(:borrowing, user: member, book:)

      sign_in member
      post "/api/v1/borrowings", params: { book_id: book.id }, as: :json

      expect(response).to have_http_status(:unprocessable_content)
      expect(json_response.fetch("errors").first.fetch("status")).to eq("422")
    end
  end

  describe "PATCH /api/v1/borrowings/:id/return" do
    it "allows librarians to mark a book as returned" do
      librarian = create(:user, :librarian)
      borrowing = create(:borrowing)

      sign_in librarian
      patch "/api/v1/borrowings/#{borrowing.id}/return", as: :json

      expect(response).to have_http_status(:ok)
      expect(jsonapi_data.fetch("id").to_i).to eq(borrowing.id)
      expect(borrowing.reload.returned_at).to be_present
    end

    it "forbids members from returning books" do
      member = create(:user)
      borrowing = create(:borrowing)

      sign_in member
      patch "/api/v1/borrowings/#{borrowing.id}/return", as: :json

      expect(response).to have_http_status(:forbidden)
      expect(json_response.fetch("errors").first.fetch("status")).to eq("403")
    end
  end
end
