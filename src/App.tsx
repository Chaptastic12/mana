import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import './App.css';

import ProjectDashBoard from './pages/ProjectDashboard/ProjectDashBoard';
import NavBar from './components/NavBar/NavBar';

import UserProvider from './Context/User-Context';
import HeaderBar from './components/HeaderBar/HeaderBar';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <div className='App'>
          <div className='NavBar'>
            <NavBar />
          </div>
          <div className='Page'>
            <HeaderBar />
            <Routes>
              <Route path='/dashboard/:projectReference' element={ <ProjectDashBoard /> } />
            </Routes>
          </div>
        </div>
      </UserProvider>
    </BrowserRouter>
  )
}

export default App;
