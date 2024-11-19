import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import {init} from "@module-federation/enhanced/runtime";

init({
    name: "host",
    remotes: [],
    shared: {
        react: {
            eager: true,
            singleton: true,
            requiredVersion: false,
        },
        'react-dom': {
            eager: true,
            singleton: true,
            requiredVersion: false,
        },
    },
})

ReactDOM.render(<App/>, document.getElementById("root"));
