import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import {init} from "@module-federation/enhanced/runtime";

init({
    name: "app1",
    remotes: [],
})

ReactDOM.render(<App/>, document.getElementById("root"));
