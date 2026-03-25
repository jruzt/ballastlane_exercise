import MetricCard from "./MetricCard";
import { ROLES } from "../lib/constants";

function librarianView(dashboard){
  return (
    <>
      <MetricCard label="Total books" value={dashboard.totals.total_books} />
      <MetricCard label="Borrowed books" value={dashboard.totals.total_borrowed_books} />
      <MetricCard label="Due today" value={dashboard.totals.books_due_today} />
      <div className="panel">
        <h2>Members with overdue books</h2>
        {dashboard.overdue_members.length === 0 ? (
          <p>No overdue members right now.</p>
        ) : (
          <ul className="simple-list overdue-members-list">
            {dashboard.overdue_members.map((member) => (
              <li key={member.id}>
                <strong>{member.full_name}</strong>
                <span>{member.email}</span>
                <span>{member.overdue_books_count} overdue</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

function memberView(dashboard){
  return (
    <>
      <MetricCard label="Borrowed books" value={dashboard?.borrowings.length || 0} />
      <MetricCard label="Overdue books" value={dashboard?.overdue_count || 0} />
      <div className="panel span-2">
        <h2>Your borrowed books</h2>
        <ul className="simple-list">
          {dashboard?.borrowings.map((borrowing) => (
            <li key={borrowing.id}>
              <strong>{borrowing.book?.title}</strong>
              <span>Due {borrowing.due_on}</span>
              <span>{borrowing.overdue ? "Overdue" : "On time"}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

function DashboardSection({ dashboard }) {
  return (
    <section className="dashboard-grid">
      {dashboard?.role === ROLES.librarian ? (
        librarianView(dashboard)
      ) : (
        memberView(dashboard)
      )}
    </section>
  );
}

export default DashboardSection;
