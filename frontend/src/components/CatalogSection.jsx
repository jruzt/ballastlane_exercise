function CatalogSection({
  books,
  onBorrow,
  onDeleteBook,
  onEditBook,
  onSearch,
  query,
  setQuery,
  user
}) {
  return (
    <div className="panel">
      <div className="section-header">
        <h2>Catalog</h2>
        <form onSubmit={onSearch} className="search-row">
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search title, author, genre" />
          <button type="submit">Search</button>
        </form>
      </div>

      <div className="book-list">
        {books.length && books.map((book) => (
          <article key={book.id} className="book-card">
            <div>
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <p>{book.genre}</p>
              <p>ISBN {book.isbn}</p>
              <p>{book.available_copies} of {book.total_copies} available</p>
            </div>
            <div className="card-actions">
              {user.role === "member" && (
                <button disabled={book.available_copies === 0} onClick={() => onBorrow(book.id)}>
                  Borrow
                </button>
              )}
              {user.role === "librarian" && (
                <>
                  <button onClick={() => onEditBook(book)}>Edit</button>
                  <button className="danger" onClick={() => onDeleteBook(book.id)}>Delete</button>
                </>
              )}
            </div>
          </article>
        )) || <p>No books found.</p>}
      </div>
    </div>
  );
}

export default CatalogSection;
