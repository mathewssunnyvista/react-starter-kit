import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { DContextProvider } from "@dynamic-framework/ui-react";

import { Provider } from 'react-redux';

import "./config/liquidConfig";
import "./config/i18nConfig";
import store from './store/store';
import App from "./App";

import "@dynamic-framework/ui-react/dist/css/dynamic-ui.css";
import "./styles/base.scss";

const root = ReactDOM.createRoot(
  document.getElementById("widgetName") as Element
);
root.render(
  <StrictMode>
    <DContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </DContextProvider>
  </StrictMode>
);
