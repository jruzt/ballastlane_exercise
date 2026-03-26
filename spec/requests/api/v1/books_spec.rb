require "rails_helper"

RSpec.describe "Books API", type: :request do
  describe "GET /api/v1/books" do
    it "returns the filtered list of books for members" do
      member = create(:user)
      match = create(:book, title: "Dune")
      create(:book, title: "Neuromancer")

      sign_in member
      get "/api/v1/books", params: { q: "Dune" }, as: :json

      expect(response).to have_http_status(:ok)
      expect(json_response.fetch("data").map { |book| book["id"].to_i }).to eq([ match.id ])
      expect(json_response.dig("meta", "total")).to eq(1)
      expect(json_response.dig("meta", "query")).to eq("Dune")
    end
  end

  describe "POST /api/v1/books" do
    it "allows librarians to create books" do
      librarian = create(:user, :librarian)

      sign_in librarian
      post "/api/v1/books", params: {
        book: {
          title: "The Left Hand of Darkness",
          author: "Ursula K. Le Guin",
          genre: "Science Fiction",
          isbn: "9780441478125",
          total_copies: 4
        }
      }, as: :json

      expect(response).to have_http_status(:created)
      expect(Book.find_by(isbn: "9780441478125")).to be_present
    end

    it "forbids members from creating books" do
      sign_in create(:user)

      post "/api/v1/books", params: {
        book: attributes_for(:book)
      }, as: :json

      expect(response).to have_http_status(:forbidden)
      expect(json_response.fetch("errors").first.fetch("status")).to eq("403")
    end
  end
end
