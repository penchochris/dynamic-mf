// Import federated module:
import App from "./App";

// Import react and createRoute
import React from "react";
import { createRoot } from "react-dom/client";

export const inject = (parentElementId, props) => {
  const root = createRoot(document.getElementById(parentElementId));
  root.render(<App {...props}/>);
};

export const unmount = (parentElementId) =>
  ReactDOM.unmountComponentAtNode(document.getElementById(parentElementId));
