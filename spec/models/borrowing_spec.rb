require "rails_helper"

RSpec.describe Borrowing, type: :model do
  it "is active when not returned" do
    expect(build(:borrowing)).to be_active
  end

  it "marks overdue borrowings correctly" do
    borrowing = build(:borrowing, :overdue)

    expect(borrowing).to be_overdue
  end

  it "validates returned_at is after borrowed_at" do
    borrowing = build(:borrowing, borrowed_at: Time.zone.now, returned_at: 1.day.ago)

    expect(borrowing).not_to be_valid
    expect(borrowing.errors[:returned_at]).to include("must be after the borrowed date")
  end

  it "scopes overdue borrowings" do
    overdue = create(:borrowing, :overdue)
    create(:borrowing)

    expect(described_class.overdue).to contain_exactly(overdue)
  end
end
