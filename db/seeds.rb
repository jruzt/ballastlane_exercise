begin
User.librarian.find_or_create_by!(email: "librarian@example.com") do |user|
  user.first_name = "Laura"
  user.last_name = "Librarian"
  user.password = "password123"
  user.password_confirmation = "password123"
end

member = User.member.find_or_create_by!(email: "member@example.com") do |user|
  user.first_name = "Marco"
  user.last_name = "Member"
  user.password = "password123"
  user.password_confirmation = "password123"
end

overdue_member = User.member.find_or_create_by!(email: "overdue@example.com") do |user|
  user.first_name = "Olivia"
  user.last_name = "Overdue"
  user.password = "password123"
  user.password_confirmation = "password123"
end

books = [
  { title: "The Left Hand of Darkness", author: "Ursula K. Le Guin", genre: "Science Fiction", isbn: "9780441478125", total_copies: 4 },
  { title: "Parable of the Sower", author: "Octavia Butler", genre: "Science Fiction", isbn: "9780446675505", total_copies: 3 },
  { title: "Educated", author: "Tara Westover", genre: "Memoir", isbn: "9780399590504", total_copies: 2 },
  { title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy", isbn: "9780547928227", total_copies: 5 },
  { title: "Atomic Habits", author: "James Clear", genre: "Self-Help", isbn: "9780735211292", total_copies: 2 },
  { title: "Sapiens", author: "Yuval Noah Harari", genre: "History", isbn: "9780062316110", total_copies: 3 }
]

books.each do |attributes|
  Book.find_or_create_by!(isbn: attributes[:isbn]) do |book|
    book.assign_attributes(attributes)
  end
end

borrowed_book = Book.find_by!(isbn: "9780446675505")
overdue_book = Book.find_by!(isbn: "9780399590504")

Borrowing.find_or_create_by!(user: member, book: borrowed_book, returned_at: nil) do |borrowing|
  borrowing.borrowed_at = 3.days.ago
  borrowing.due_on = 11.days.from_now.to_date
end

Borrowing.find_or_create_by!(user: overdue_member, book: overdue_book, returned_at: nil) do |borrowing|
  borrowing.borrowed_at = 3.weeks.ago
  borrowing.due_on = 1.week.ago.to_date
end

puts "Seeded users:"
puts "  Librarian: librarian@example.com / password123"
puts "  Member: member@example.com / password123"
puts "  Overdue member: overdue@example.com / password123"
puts "Seeded #{Book.count} books and #{Borrowing.count} borrowings."

rescue StandardError => e
puts "Error: #{e.message}"
end
