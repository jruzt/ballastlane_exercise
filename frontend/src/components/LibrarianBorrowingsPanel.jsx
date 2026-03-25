function LibrarianBorrowingsPanel({ borrowings, onReturn }) {
  return (
    <section className="panel">
      <h2>Active borrowings</h2>
      <ul className="simple-list borrowings-list">
        {borrowings.map((borrowing) => (
          <li key={borrowing.id}>
            <div className="borrowing-summary">
              <strong>
                {borrowing.book?.title}
                {borrowing.overdue && <span className="overdue-badge">Overdue</span>}
              </strong>
              <div className="borrowing-meta">
                <span>
                  <small>Member</small>
                  {borrowing.user?.full_name}
                </span>
                <span>
                  <small>Due date</small>
                  {borrowing.due_on}
                </span>
              </div>
            </div>
            {borrowing.active && <button onClick={() => onReturn(borrowing.id)}>Mark as returned</button>}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default LibrarianBorrowingsPanel;
