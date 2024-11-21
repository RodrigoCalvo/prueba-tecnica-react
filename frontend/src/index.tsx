import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ReduxProvider from "./store/provider";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ReduxProvider>
        <App />
      </ReduxProvider>
    </BrowserRouter>
  </React.StrictMode>
);
