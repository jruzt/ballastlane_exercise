function SidebarPanel({
  bookForm,
  borrowings,
  editingBookId,
  onBookSubmit,
  resetBookForm,
  setBookForm,
  user
}) {
  if (user.role === "librarian") {
    return (
      <div className="panel">
        <h2>{editingBookId ? "Edit book" : "Add a book"}</h2>
        <form onSubmit={onBookSubmit} className="form-grid">
          <label>
            Title
            <input value={bookForm.title} onChange={(event) => setBookForm({ ...bookForm, title: event.target.value })} required />
          </label>
          <label>
            Author
            <input value={bookForm.author} onChange={(event) => setBookForm({ ...bookForm, author: event.target.value })} required />
          </label>
          <label>
            Genre
            <input value={bookForm.genre} onChange={(event) => setBookForm({ ...bookForm, genre: event.target.value })} required />
          </label>
          <label>
            ISBN
            <input value={bookForm.isbn} onChange={(event) => setBookForm({ ...bookForm, isbn: event.target.value })} required />
          </label>
          <label>
            Total copies
            <input type="number" min="1" value={bookForm.total_copies} onChange={(event) => setBookForm({ ...bookForm, total_copies: event.target.value })} required />
          </label>
          <div className="form-actions">
            <button type="submit" className="primary-button">{editingBookId ? "Save changes" : "Create book"}</button>
            {editingBookId && <button type="button" onClick={resetBookForm}>Cancel</button>}
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="panel">
      <h2>Your activity</h2>
      <ul className="simple-list">
        {borrowings.map((borrowing) => (
          <li key={borrowing.id}>
            <strong>{borrowing.book?.title}</strong>
            <span>Due {borrowing.due_on}</span>
            <span>{borrowing.overdue ? "Overdue" : "Active"}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SidebarPanel;
