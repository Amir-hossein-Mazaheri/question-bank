import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { StyledEngineProvider } from "@mui/material/styles";

import "./index.css";
import 'vazir-font/dist/Farsi-Digits/font-face-FD.css';

ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <App />
  </StyledEngineProvider>,
  document.getElementById("root")
);
