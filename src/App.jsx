import React from 'react'
import MainLayout from './Layouts/MainLayout';
import Sidebar from './Components/Common/Sidebar'
import Contents from './Components/Common/Contents'
import Store from './Store/configStore';
import { Provider } from 'react-redux'

function App() {
  return (
    <Provider store={Store}>
      <MainLayout sidebar={<Sidebar />} content={<Contents />} />
    </Provider>
  );
}

export default App;