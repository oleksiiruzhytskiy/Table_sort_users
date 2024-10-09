import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import store from "./store";
import { Provider } from "react-redux";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
console.log('store', store.dispatch({type: 'users/getUsers'}));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App/>
    </React.StrictMode>
  </Provider>
);
