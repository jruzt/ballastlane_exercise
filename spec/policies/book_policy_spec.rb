require "rails_helper"

RSpec.describe BookPolicy do
  subject(:policy) { described_class.new(user, book) }

  let(:book) { build(:book) }

  context "when the user is a librarian" do
    let(:user) { build(:user, :librarian) }

    it "allows management actions" do
      expect(policy.create?).to be(true)
      expect(policy.update?).to be(true)
      expect(policy.destroy?).to be(true)
    end
  end

  context "when the user is a member" do
    let(:user) { build(:user) }

    it "allows reading only" do
      expect(policy.index?).to be(true)
      expect(policy.show?).to be(true)
      expect(policy.create?).to be(false)
      expect(policy.update?).to be(false)
      expect(policy.destroy?).to be(false)
    end
  end
end
