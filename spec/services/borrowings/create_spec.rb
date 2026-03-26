require "rails_helper"

RSpec.describe Borrowings::Create, type: :service do
  describe "#call" do
    it "creates a borrowing for an available book" do
      user = create(:user)
      book = create(:book, total_copies: 2)

      borrowing = described_class.new(user:, book:).call

      expect(borrowing).to be_persisted
      expect(borrowing.user).to eq(user)
      expect(borrowing.book).to eq(book)
      expect(borrowing.due_on).to eq(2.weeks.from_now.to_date)
    end

    it "does not allow the same member to borrow the same book twice" do
      user = create(:user)
      book = create(:book)
      create(:borrowing, user:, book:)

      expect {
        described_class.new(user:, book:).call
      }.to raise_error(ActiveRecord::RecordInvalid, /already have this book/)
    end

    it "does not allow borrowing when no copies are available" do
      book = create(:book, total_copies: 1)
      create(:borrowing, book:)

      expect {
        described_class.new(user: create(:user), book:).call
      }.to raise_error(ActiveRecord::RecordInvalid, /not available/)
    end
  end
end
