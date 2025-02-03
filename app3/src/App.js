import React, { useEffect } from "react";
import { setLogger } from "@tef-novum/webview-bridge";

const App = () => {
  useEffect(() => setLogger(), []);

  return (
    <div
      style={{
        margin: "10px",
        padding: "10px",
        textAlign: "center",
        backgroundColor: "cyan",
      }}
    >
      <h1>App 2 runs with {React.version}</h1>
    </div>
  );
};

export default App;
