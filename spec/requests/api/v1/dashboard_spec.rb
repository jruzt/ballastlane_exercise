require "rails_helper"

RSpec.describe "Dashboard API", type: :request do
  describe "GET /api/v1/dashboard" do
    it "returns librarian metrics and overdue members" do
      librarian = create(:user, :librarian)
      member = create(:user, email: "member@example.com")
      book = create(:book)
      create(:borrowing, :overdue, user: member, book:)

      sign_in librarian
      get "/api/v1/dashboard", as: :json

      expect(response).to have_http_status(:ok)
      expect(jsonapi_data.fetch("type")).to eq("dashboard")
      expect(jsonapi_attributes.dig("totals", "total_books")).to eq(1)
      overdue_member_ref = jsonapi_relationship(:overdue_members).first
      expect(jsonapi_included(type: :user, id: overdue_member_ref.fetch("id")).dig("attributes", "email")).to eq(member.email)
    end

    it "returns a member dashboard with borrowed books" do
      member = create(:user)
      borrowing = create(:borrowing, user: member)

      sign_in member
      get "/api/v1/dashboard", as: :json

      expect(response).to have_http_status(:ok)
      expect(jsonapi_attributes.fetch("role")).to eq("member")
      expect(jsonapi_relationship(:borrowings).first.fetch("id").to_i).to eq(borrowing.id)
    end
  end
end
