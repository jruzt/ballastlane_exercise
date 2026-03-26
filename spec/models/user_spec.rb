require "rails_helper"

RSpec.describe User, type: :model do
  it "is valid with the factory" do
    expect(build(:user)).to be_valid
  end

  it "requires email, first and last name" do
    user = build(:user, email: nil, first_name: nil, last_name: nil)

    expect(user).not_to be_valid
    expect(user.errors[:email]).to be_present
    expect(user.errors[:first_name]).to be_present
    expect(user.errors[:last_name]).to be_present
  end

  it "defaults to member role" do
    user = create(:user)

    expect(user).to be_member
  end

  it "builds a full name" do
    user = build(:user, first_name: "Sam", last_name: "Taylor")

    expect(user.full_name).to eq("Sam Taylor")
  end
end
