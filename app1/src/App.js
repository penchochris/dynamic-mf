import React, { Suspense, lazy } from "react";
import {
  loadRemote,
  registerRemotes,
} from "@module-federation/enhanced/runtime";

const useRemote = (scope, module) => {
  const LazyComponent = lazy(() => {
    registerRemotes([
      {
        name: scope,
        // this entry url could be loaded by a manifest/api/whatever
        entry: "http://localhost:3002/remoteEntry.js",
      },
    ]);
    return loadRemote(`${scope}/${module}`, {
      from: "runtime",
    });
  });

  // Could add error boundary here
  return (props) => <LazyComponent {...props} />;
};

const App = () => {
  const RemoteApp = useRemote("app2", "App");

  return (
    <div>
      <div
        style={{
          margin: "10px",
          padding: "10px",
          textAlign: "center",
          backgroundColor: "greenyellow",
        }}
      >
        <h1>App1</h1>
      </div>
      <Suspense fallback={"loading..."}>
        <RemoteApp />
      </Suspense>
    </div>
  );
};

export default App;
