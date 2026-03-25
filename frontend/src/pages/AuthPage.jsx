import AuthScreen from "../components/AuthScreen";

function AuthPage({ actions, state }) {
  return (
    <AuthScreen
      authForm={state.auth.authForm}
      authMode={state.auth.authMode}
      error={state.ui.error}
      message={state.ui.message}
      onModeChange={actions.setAuthMode}
      onSubmit={actions.handleAuthSubmit}
      setAuthForm={actions.setAuthForm}
    />
  );
}

export default AuthPage;
