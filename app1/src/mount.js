import * as React from "react";
import { importRemote } from "@module-federation/utilities";

const ErrorView = () => <div>Error</div>;

const LazyErrorView = {
  default: () => <ErrorView />,
};

const parentElementId = "parent";

export const Mount = ({ importRemoteOptions, envs }) => {
  const [{ inject, unmount }, setData] = React.useState({});

  const { module, scope, url, remoteEntryFileName, bustRemoteEntryCache } =
    importRemoteOptions;

  console.log({
    module,
    scope,
    url,
    remoteEntryFileName,
    bustRemoteEntryCache,
  });
  React.useEffect(() => {
    const envKey = window["__ENV_KEY__"] || "@envs";
    sessionStorage.setItem(envKey, JSON.stringify(envs));

    window["__PUBLIC_PATH__"] = `${url.toString()}/`;
  }, [envs, url]);

  React.useEffect(() => {
    const fetchExternalModule = async () => {
      const importedModule = await importRemote({
        url: "http://localhost:3002",
        scope: "app2",
        module: './appInjector',
        remoteEntryFileName: "remoteEntry.js",
        bustRemoteEntryCache: false,
      });

      const a = {
        module: "./App",
        scope: "framework_brasil_archetype_spa_front",
        url: "https://corelocal4pframworkbrsa.telefonicabigdata.…tends/framework-brasil-archetype-spa-front/1.0.47",
        remoteEntryFileName:
          "framework_brasil_archetype_spa_frontRemoteEntry.e4344e6a2.js",
        bustRemoteEntryCache: false,
      };

      setData(importedModule);
    };

    fetchExternalModule();
  }, []);

  if (!url || !scope || !module || !remoteEntryFileName) {
    return <ErrorView />;
  }

  React.useEffect(() => {
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
      <div id={parentElementId} />
    </div>
  );
};
