require "rails_helper"

RSpec.describe BorrowingPolicy do
  subject(:policy) { described_class.new(user, borrowing) }

  let(:borrowing) { build(:borrowing) }

  context "when the user is a librarian" do
    let(:user) { build(:user, :librarian) }

    it "allows listing and returning borrowings" do
      expect(policy.index?).to be(true)
      expect(policy.return_book?).to be(true)
    end

    it "does not allow creating borrowings" do
      expect(policy.create?).to be(false)
    end
  end

  context "when the user is a member" do
    let(:user) { build(:user) }

    it "allows listing and creating borrowings" do
      expect(policy.index?).to be(true)
      expect(policy.create?).to be(true)
    end

    it "does not allow returning borrowings" do
      expect(policy.return_book?).to be(false)
    end
  end

  context "when there is no authenticated user" do
    let(:user) { nil }

    it "denies all actions" do
      expect(policy.index?).to be_falsey
      expect(policy.create?).to be_falsey
      expect(policy.return_book?).to be_falsey
    end
  end
end
