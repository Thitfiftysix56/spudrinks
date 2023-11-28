import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PageSelectBeverage from './pages/PageSelectBeverage'
import PageSelectBeverageLogin from './pages/PageSelectBeverageLogin'
import PageLogin from './pages/PageLogin'
import PageRegister from './pages/PageRegister'
import PageMannage from './pages/PageMannage'
import PageEditUser from './pages/PageEditUser'
import PageEditUserPerson from './pages/PageEditUserPerson'
import PageScanQrCode from './pages/PageScanQrCode'
import PageScanQrcodeNoAl from './pages/PageScanQrcodeNoAl'
import PageMicrophone from './pages/PageMicrophone'
import PageMannageBeverage from './pages/PageMannageBeverage'
function App() {
  return (
    <Router>
      <Routes >
        <Route path='/' element={<PageSelectBeverageLogin/>} />
        <Route path='/PageSelectBeverage' element={<PageSelectBeverage/>} />
        <Route path='/PageLogin' element={<PageLogin/>} />
        <Route path='/PageRegister' element={<PageRegister/>} />
        <Route path='/PageMannage' element={<PageMannage/>} />
        <Route path='/PageEditUser' element={<PageEditUser/>} />
        <Route path='/PageEditUserPerson' element={<PageEditUserPerson/>} />
        <Route path='/PageScanQrCode' element={<PageScanQrCode/>} />
        <Route path='/PageScanQrcodeNoAl' element={<PageScanQrcodeNoAl/>} />
        <Route path='/PageMicrophone' element={<PageMicrophone/>} />
        <Route path='/PageMannageBeverage' element={<PageMannageBeverage/>} />
      </Routes>
    </Router>


  );
}

export default App;
