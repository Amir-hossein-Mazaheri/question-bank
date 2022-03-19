import React, { lazy, Suspense, useEffect } from "react";
import MainLayout from "./Layouts/MainLayout";
import Sidebar from "./Components/Common/Sidebar";
import Contents from "./Components/Common/Contents";
import Store from "./Store/configStore";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Container from "./Layouts/Container";
import { Spin } from "antd";
import NotFoundPage from "./404";
import Auth from "./Helpers/Auth";
import axios from "axios";
// lazy load pages
const AddQuestion = lazy(() => import("./Components/AddQuestion/AddQuestion"));
const EditQuestion = lazy(() =>
  import("./Components/EditQuestion/EditQuestion")
);
const ShowSingleQuestion = lazy(() =>
  import("./Components/ShowSingleQuestion/ShowSIngleQuestion")
);

function App() {
  useEffect(() => {
    const isLoggedIn = Auth.isLoggedIn();
    if (!isLoggedIn) {
      window.location.replace("http://lapluse.ir/exam-login/");
      return;
    }
    axios.get("/panel/").then((res) => {
      const role = res.data.role;
      console.log(role);
      if (role !== "question_creator") {
        window.location.replace("http://lapluse.ir/exam-login/");
      }
    });
  });

  return (
    <Provider store={Store}>
      <Router basename={"question-bank"}>
        <Suspense
          fallback={
            <div className="absolute inset-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Spin />
              </div>
            </div>
          }
        >
          <Routes>
            <Route>
              <Route
                index
                element={
                  <MainLayout sidebar={<Sidebar />} content={<Contents />} />
                }
              />
              <Route
                path="add-question"
                element={
                  <Container>
                    <AddQuestion />
                  </Container>
                }
              />
              <Route
                path="edit-question/:id"
                element={
                  <Container>
                    <EditQuestion />
                  </Container>
                }
              />
              <Route
                path="question/:id"
                element={
                  <Container>
                    <ShowSingleQuestion />
                  </Container>
                }
              />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </Provider>
  );
}

export default App;
