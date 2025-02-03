import React, { Suspense, useState, useEffect } from "react";
import {
  loadRemote,
  registerRemotes,
} from "@module-federation/enhanced/runtime";
import { setLogger } from "@tef-novum/webview-bridge";

const parentElementId = "parent";

const App = () => {
  const [{ inject, unmount }, setData] = useState({});
  useEffect(() => {
    setLogger();
    const getRemote = async (scope, module) => {
      registerRemotes([
        {
          name: scope,
          entry: "http://localhost:3002/remoteEntry.js",
        },
      ]);
      const Injector = await loadRemote(`${scope}/${module}`, {
        from: "runtime",
      });

      const Injected = await Injector;

      setData(Injected);
    };

    getRemote("app2", "appInjector");
  }, []);

  useEffect(() => {
    inject && inject(parentElementId);
    () => unmount(parentElementId);
  }, [inject, unmount]);

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
        <h1>App1 runs with {React.version}</h1>
      </div>
      <Suspense fallback={"loading..."}>
        <div id={parentElementId} />
      </Suspense>
    </div>
  );
};

export default App;
