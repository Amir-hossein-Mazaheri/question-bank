import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "vazir-font/dist/Farsi-Digits/font-face-FD.css";
import { ConfigProvider } from "antd";
import axios from "axios";
import "antd/dist/antd.css";

import "./index.css";
import "./App.css";

axios.defaults.baseURL = "http://lapluse.ir/examapi";

ReactDOM.render(
  <StrictMode>
    <ConfigProvider direction="rtl">
      <App />
    </ConfigProvider>
  </StrictMode>,
  document.getElementById("root")
);
