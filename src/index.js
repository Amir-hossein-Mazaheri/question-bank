import { StrictMode } from "react";
import { render } from "react-dom";

import { ConfigProvider } from "antd";
import axios from "axios";
import App from "./App";
import Auth from "./Helpers/Auth";

import "vazir-font/dist/Farsi-Digits/font-face-FD.css";
import "antd/dist/antd.css";
import "./index.css";
import "./App.css";

if (process.env.NODE_ENV === "development") {
  localStorage.setItem(
    "refresh",
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY1MDUzNzU4MywianRpIjoiYzlhOWE2ODNlYzE4NDQxMmE0OTA2YWUyNWI0ODJkYjYiLCJ1c2VyX2lkIjoxfQ.pw3MTEVbJnL1fidr0xRk-TX15Qgm_kTiuGQ4d6A_nEY"
  );

  localStorage.setItem(
    "access",
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjUwNDUxNDgzLCJqdGkiOiI5NmQxYTQxYTg1Mzk0YWZkOWIyOTIyMjJiMTc3NTVhZSIsInVzZXJfaWQiOjF9.HG-2DCXW1e52Tj2llbyrrqQWReTbZ6-HdI5nZNXCiPg"
  );
}

axios.defaults.baseURL = "http://lapluse.ir/examapi";
axios.defaults.headers.common["Authorization"] =
  "Bearer " + Auth.getToken("access");

axios.interceptors.response.use(
  (config) => config,
  async (err) => {
    const config = err.config;
    if (err.response.status === 401) {
      if (Auth.isTokenExpired("refresh")) {
        window.location.replace("http://lapluse.ir/exam-login/");
      }
      console.log("getting refresh !");
      const access = await Auth.checkLogin();
      localStorage.setItem("access", access);
      config.headers["Authorization"] = "Bearer " + access;
      console.log("new access token : ", Auth.getToken("access"));
      return axios(config);
    }

    return Promise.reject(err);
  }
);

if (process.env.NODE_ENV === "production") {
  console.log = () => {};
  console.error = () => {};
  console.debug = () => {};
}

render(
  <StrictMode>
    <ConfigProvider direction="rtl">
      <App />
    </ConfigProvider>
  </StrictMode>,
  document.getElementById("root")
);
