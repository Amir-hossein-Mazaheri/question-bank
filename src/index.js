import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "vazir-font/dist/Farsi-Digits/font-face-FD.css";
import { ConfigProvider } from "antd";
import "antd/dist/antd.css";

import "./index.css";

ReactDOM.render(
  <StrictMode>
    <ConfigProvider direction="rtl">
      <App />
    </ConfigProvider>
  </StrictMode>,
  document.getElementById("root")
);
