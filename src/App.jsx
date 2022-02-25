import React from "react";
import MainLayout from "./Layouts/MainLayout";
import Sidebar from "./Components/Common/Sidebar";
import Contents from "./Components/Common/Contents";
import Store from "./Store/configStore";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Container from "./Layouts/Container";
import AddQuestion from "./Components/AddQuestion/AddQuestion";

function App() {
  return (
    <Provider store={Store}>
      <Router>
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
      </Router>
    </Provider>
  );
}

export default App;
