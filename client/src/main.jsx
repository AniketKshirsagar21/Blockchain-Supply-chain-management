import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThirdwebProvider } from "@thirdweb-dev/react";

import "./styles/globals.css";

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { StateContextProvier } from "./context";
// import "@fortawesome/fontawesome-free/css/all.min.css";

const activeChain = "goerli";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ThirdwebProvider activeChain={activeChain}>
      <StateContextProvier>
      <App />
      </StateContextProvier>
    </ThirdwebProvider>
  </React.StrictMode>
);

