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
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY1MDYzMzcxNywianRpIjoiYzRhODVkZTJhNmQ3NDk5ZGIwYmU3NmZmMWE1NDRmZjIiLCJ1c2VyX2lkIjoxfQ.wfhdd977dmz7WVi5Kft1ZNx3cSOC6D1xCzkNiOajsfk"
  );

  localStorage.setItem(
    "access",
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjUwNTQ3NjE3LCJqdGkiOiJiOTc0ZGJiMjk0NTI0NDU2YTg1ZjgyYjk0NGE1M2QzZCIsInVzZXJfaWQiOjF9.MZB4ND4H77CJnd3ldNtOFahkjr_F2XkDUjKmF3nrC7w"
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
