import { createRoot } from "react-dom/client";
import "./Styles/index.css";
import App from "./app/App";
import { Provider } from "react-redux";
import store, { persistor } from "./app/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </QueryClientProvider>
  </Provider>
);
