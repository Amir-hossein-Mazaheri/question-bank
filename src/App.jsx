import React, { lazy, Suspense } from "react";
import MainLayout from "./Layouts/MainLayout";
import Sidebar from "./Components/Common/Sidebar";
import Contents from "./Components/Common/Contents";
import Store from "./Store/configStore";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Container from "./Layouts/Container";
import { Spin } from "antd";
const AddQuestion = lazy(() => import("./Components/AddQuestion/AddQuestion"));

function App() {
  return (
    <Provider store={Store}>
      <Router>
        <Suspense
          fallback={
            <Spin className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          }
        >
          <Routes>
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
          </Routes>
        </Suspense>
      </Router>
    </Provider>
  );
}

export default App;
