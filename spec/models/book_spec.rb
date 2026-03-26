require "rails_helper"

RSpec.describe Book, type: :model do
  it "is valid with the factory" do
    expect(build(:book)).to be_valid
  end

  it "requires a unique isbn" do
    create(:book, isbn: "ABC-123")
    duplicate = build(:book, isbn: "ABC-123")

    expect(duplicate).not_to be_valid
  end

  it "requires total copies to be positive" do
    book = build(:book, total_copies: 0)

    expect(book).not_to be_valid
  end

  it "searches by title, author, or genre" do
    dune = create(:book, title: "Dune", author: "Frank Herbert", genre: "Sci-Fi")
    create(:book, title: "Sapiens", author: "Yuval Noah Harari", genre: "History")

    expect(described_class.search("Dune")).to contain_exactly(dune)
    expect(described_class.search("Frank")).to contain_exactly(dune)
    expect(described_class.search("Sci")).to contain_exactly(dune)
  end

  it "calculates available copies from active borrowings" do
    book = create(:book, total_copies: 3)
    create_list(:borrowing, 2, book: book)

    expect(book.available_copies).to eq(1)
    expect(book).to be_available
  end
end
