require "rails_helper"

RSpec.describe Borrowings::ReturnBook, type: :service do
  describe "#call" do
    it "marks an active borrowing as returned" do
      borrowing = create(:borrowing)

      described_class.new(borrowing:).call

      expect(borrowing.reload.returned_at).to be_present
    end

    it "raises an error when the borrowing is already returned" do
      borrowing = create(:borrowing, :returned)

      expect {
        described_class.new(borrowing:).call
      }.to raise_error(ActiveRecord::RecordInvalid, /already been returned/)
    end
  end
end
