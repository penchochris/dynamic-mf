import App from "./App";
import React from "react";
import { createRoot } from "react-dom/client";

export const inject = (parentElementId) => {
  const root = createRoot(document.getElementById(parentElementId));
  root.render(<App />);
};

export const unmount = (parentElementId) =>
  ReactDOM.unmountComponentAtNode(document.getElementById(parentElementId));
