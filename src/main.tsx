import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./store/index.ts";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            color: "#facc15",
            fontWeight: "bold",
            borderRadius: "6px",
          },
          duration: 3000,
        }}
      />
      <App />
    </Provider>
  </StrictMode>
);
