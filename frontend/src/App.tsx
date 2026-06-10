import "./App.css";
import { BrowserRouter as Router } from "react-router";
import AppRouter from "./routes/appRouter";
import { AuthProvider } from "./context/authContext";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <AppRouter />
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
