require "rails_helper"

RSpec.describe "Authentication API", type: :request do
  describe "POST /api/v1/auth/sign_up" do
    it "registers a member user" do
      post user_registration_path, params: {
        user: {
          first_name: "Ana",
          last_name: "Lopez",
          email: "ana@example.com",
          password: "password123",
          password_confirmation: "password123"
        }
      }, as: :json

      expect(response).to have_http_status(:created)
      expect(jsonapi_data.fetch("type")).to eq("user")
      expect(jsonapi_attributes.fetch("role")).to eq("member")
    end
  end

  describe "POST /api/v1/auth/sign_in" do
    it "logs in an existing user" do
      user = create(:user, email: "reader@example.com", password: "password123", password_confirmation: "password123")

      post user_session_path, params: {
        user: {
          email: user.email,
          password: "password123"
        }
      }, as: :json

      expect(response).to have_http_status(:ok)
      expect(jsonapi_data.fetch("type")).to eq("user")
      expect(jsonapi_attributes.fetch("email")).to eq(user.email)
    end
  end
end
