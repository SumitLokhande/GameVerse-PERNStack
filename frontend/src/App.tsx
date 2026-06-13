import "./App.css";
import { BrowserRouter as Router } from "react-router";
import AppRouter from "./routes/appRouter";
import { AuthProvider } from "./context/authContext";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <AuthProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Router>
              <AppRouter />
              <ToastContainer aria-label={undefined} position="top-right" />
            </Router>
          </PersistGate>
        </Provider>
      </AuthProvider>
    </>
  );
}

export default App;
