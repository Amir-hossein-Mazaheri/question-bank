import React from 'react'
import MainLayout from './Layouts/MainLayout';
import Sidebar from './Components/Common/Sidebar'
import Contents from './Components/Common/Contents'

function App() {
  return ( 
    <MainLayout sidebar={<Sidebar />} content={<Contents />} />
   );
}

export default App;