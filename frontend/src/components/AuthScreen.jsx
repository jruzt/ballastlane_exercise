function AuthScreen({
  authForm,
  authMode,
  error,
  message,
  onModeChange,
  onSubmit,
  setAuthForm
}) {
  return (
    <main className="shell auth-shell">
      <section className="hero-card">
        <p className="eyebrow">Library Management System</p>
        <h1>Track books, borrowing, and overdue members in one place.</h1>
        <p className="lede">
          This demo supports member self-registration and librarian workflow management.
        </p>
      </section>

      <section className="panel auth-panel">
        <div className="toggle-row">
          <button className={authMode === "login" ? "active" : ""} onClick={() => onModeChange("login")}>Log In</button>
          <button className={authMode === "register" ? "active" : ""} onClick={() => onModeChange("register")}>Register</button>
        </div>

        {error && <p className="alert error">{error}</p>}
        {message && <p className="alert success">{message}</p>}

        <form onSubmit={onSubmit} className="form-grid">
          {authMode === "register" && (
            <>
              <label>
                First name
                <input
                  value={authForm.first_name}
                  onChange={(event) => setAuthForm({ ...authForm, first_name: event.target.value })}
                  required
                />
              </label>
              <label>
                Last name
                <input
                  value={authForm.last_name}
                  onChange={(event) => setAuthForm({ ...authForm, last_name: event.target.value })}
                  required
                />
              </label>
            </>
          )}

          <label>
            Email
            <input
              type="email"
              value={authForm.email}
              onChange={(event) => setAuthForm({ ...authForm, email: event.target.value })}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={authForm.password}
              onChange={(event) => setAuthForm({ ...authForm, password: event.target.value })}
              required
            />
          </label>

          {authMode === "register" && (
            <label>
              Confirm password
              <input
                type="password"
                value={authForm.password_confirmation}
                onChange={(event) => setAuthForm({ ...authForm, password_confirmation: event.target.value })}
                required
              />
            </label>
          )}

          <button type="submit" className="primary-button">
            {authMode === "login" ? "Enter dashboard" : "Create account"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default AuthScreen;
