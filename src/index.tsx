import React from "react";
import ReactDOM from "react-dom/client";
import AppComponent from "./components/App/AppComponent.tsx";
import "./index.scss";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppComponent />
    </Provider>
  </React.StrictMode>,
);
