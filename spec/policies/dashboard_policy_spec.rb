require "rails_helper"

RSpec.describe DashboardPolicy do
  subject(:policy) { described_class.new(user, :dashboard) }

  context "when the user is a librarian" do
    let(:user) { build(:user, :librarian) }

    it "allows access" do
      expect(policy.show?).to be(true)
    end
  end

  context "when the user is a member" do
    let(:user) { build(:user) }

    it "allows access" do
      expect(policy.show?).to be(true)
    end
  end

  context "when there is no authenticated user" do
    let(:user) { nil }

    it "denies access" do
      expect(policy.show?).to be(false)
    end
  end
end
