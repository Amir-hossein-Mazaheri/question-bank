import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "vazir-font/dist/Farsi-Digits/font-face-FD.css";
import { ConfigProvider } from "antd";
import axios from "axios";
import "antd/dist/antd.css";
import Auth from "./Helpers/Auth";

import "./index.css";
import "./App.css";

axios.defaults.baseURL = "http://lapluse.ir/examapi";
axios.defaults.headers.common["Authorization"] =
  "Bearer " + Auth.getToken("access");

axios.interceptors.response.use(
  (config) => config,
  async (err) => {
    const config = err.config;
    if (err.response.status === 401) {
      console.log("getting refresh !");
      const refresh = await Auth.checkLogin();
      localStorage.setItem("refresh", refresh);
      config.headers["Authorization"] = "Bearer " + refresh;
      return axios(config);
    }

    return Promise.reject(err);
  }
);

ReactDOM.render(
  <StrictMode>
    <ConfigProvider direction="rtl">
      <App />
    </ConfigProvider>
  </StrictMode>,
  document.getElementById("root")
);
