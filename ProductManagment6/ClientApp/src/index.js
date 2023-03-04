import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import configureStore from "./_STATE/configureStore";
import { Provider as ReduxProvider } from "react-redux";

const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href");
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
const store = configureStore();

root.render(
  <ReduxProvider store={store}>
    <BrowserRouter basename={baseUrl}>
      <App />
    </BrowserRouter>
  </ReduxProvider>
);
