import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "./contex/AuthContex.jsx";
import { ThemeProvider } from "./contex/ThemeContex.jsx";

import { Buffer } from "buffer";
import process from "process";
import EventEmitter from "events";

window.Buffer = Buffer;
window.process = process;
window.EventEmitter = EventEmitter;


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
