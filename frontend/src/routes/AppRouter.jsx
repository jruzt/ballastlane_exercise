import { Navigate, Route, Routes } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import DashboardPage from "../pages/DashboardPage";

function AppRouter({ actions, state }) {
  const isAuthenticated = Boolean(state.auth.user);

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <AuthPage actions={actions} state={state} />}
      />
      <Route
        path="/register"
        element={
          isAuthenticated
            ? <Navigate to="/dashboard" replace />
            : <AuthPage actions={{ ...actions, setAuthMode: () => actions.setAuthMode("register") }} state={{ ...state, auth: { ...state.auth, authMode: "register" } }} />
        }
      />
      <Route
        path="/dashboard"
        element={isAuthenticated ? <DashboardPage actions={actions} state={state} /> : <Navigate to="/login" replace />}
      />
      <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
    </Routes>
  );
}

export default AppRouter;
