import * as React from "react";
import { Mount } from "./mount";

export function factoryTemplateData(microfronts) {
  const manifest = [];
  const modules = [];

  microfronts.forEach((microfront) => {
    const [mfRelease] = microfront.releases;

    if (!mfRelease) {
      return;
    }

    if (mfRelease.prefetch) {
      manifest.push(...mfRelease.files);
    }

    modules.push({
      exact: microfront.path.replace(/\*$/, "").replace(/\/$/, ""),
      path: microfront.path,
      envs: mfRelease.envs,
      version: mfRelease.version,
      params: mfRelease.params,
      bundle_size: mfRelease.bundle_size,
      moduleMetaData: {
        url: `${microfront.static_files_repository}/${mfRelease.version}`,
        module: mfRelease.module_expose,
        scope: mfRelease.scope,
        bustRemoteEntryCache: mfRelease.cache,
        remoteEntryFileName: mfRelease.remote_entry_fileName,
      },
    });
  });

  return {
    manifest,
    modules,
  };
}

const getDefaultConfig = () => ({
  resetToDefaultState: true,
});

const getScreenConfig = () => ({
  showBackButton: true,
  showReloadButton: false,
  showProfileButton: false,
  leftActions: [],
  rightActions: [],
  expandTitle: "",
});

const External = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [federatedModule, setFederatedModule] = React.useState(null);

  React.useEffect(() => {
    fetch(
      "https://twiremock-novum-core-4p.vivo-br-dev.svc.dev.tuenti.io/remote-modules"
    )
      .then((res) => res.json())
      .then((data) => {
        setFederatedModule(factoryTemplateData(data));
        setIsLoading(false);
      });
  }, []);

  const module = React.useMemo(
    () =>
      federatedModule?.modules.find(
        (module) => module.exact === "/archetype-spa"
      ),
    [federatedModule?.modules]
  );

  if (isLoading) {
    return <>Loading</>;
  }

  return (
    <>
      {module ? (
        <Mount
          key="external-module"
          importRemoteOptions={module.moduleMetaData}
          envs={{
            ...module.envs,
            ROUTER_BASE_URL: "/",
            FAKE_API: "https://jsonplaceholder.typicode.com/photos",
          }}
          remoteProps={{
            vivoSpaRootState: {
              state: {
                useNavigation: (a) => console.log(a),
                tagging: {},
              },
            },
          }}
        />
      ) : (
        <div>Module {moduleName} is not found</div>
      )}
    </>
  );
};

export default External;
