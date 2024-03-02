import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { ImageProvider } from "./context/ImageContext.tsx";
import { QueryProvider } from "./context/QueryContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ImageProvider>
        <QueryProvider>
          <App />
        </QueryProvider>
      </ImageProvider>
    </BrowserRouter>
  </React.StrictMode>
);
