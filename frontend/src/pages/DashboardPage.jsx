import CatalogSection from "../components/CatalogSection";
import DashboardSection from "../components/DashboardSection";
import LibrarianBorrowingsPanel from "../components/LibrarianBorrowingsPanel";
import SidebarPanel from "../components/SidebarPanel";

function DashboardPage({ actions, state }) {
  const { auth, books, borrowings, dashboard, ui } = state;

  return (
    <main className="shell app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">{auth.user.role}</p>
          <h1>Welcome, {auth.user.full_name}</h1>
        </div>
        <button onClick={actions.handleLogout}>Log out</button>
      </header>

      {ui.error && <p className="alert error">{ui.error}</p>}
      {ui.message && <p className="alert success">{ui.message}</p>}

      <DashboardSection dashboard={dashboard.data} />

      <section className="workspace-grid">
        <CatalogSection
          books={books.items}
          onBorrow={actions.handleBorrow}
          onDeleteBook={actions.handleDeleteBook}
          onEditBook={actions.startEdit}
          onSearch={actions.handleSearch}
          query={books.query}
          setQuery={actions.setQuery}
          user={auth.user}
        />

        <SidebarPanel
          bookForm={books.form}
          borrowings={borrowings.items}
          editingBookId={books.editingBookId}
          onBookSubmit={actions.handleBookSubmit}
          resetBookForm={actions.resetBookForm}
          setBookForm={actions.setBookForm}
          user={auth.user}
        />
      </section>

      {auth.user.role === "librarian" && (
        <LibrarianBorrowingsPanel borrowings={borrowings.items} onReturn={actions.handleReturn} />
      )}
    </main>
  );
}

export default DashboardPage;
