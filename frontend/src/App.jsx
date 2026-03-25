import { BrowserRouter } from "react-router-dom";
import { useAppController } from "./hooks/useAppController";
import AppRouter from "./routes/AppRouter";

function App() {
  const { actions, state } = useAppController();

  if (state.ui.loading) {
    return <main className="shell"><p>Loading application...</p></main>;
  }

  return (
    <BrowserRouter>
      <AppRouter actions={actions} state={state} />
    </BrowserRouter>
  );
}

export default App;
