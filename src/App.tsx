import React from 'react';

import './App.css';

import ProjectDashBoard from './pages/ProjectDashboard/ProjectDashBoard';
import NavBar from './components/NavBar/NavBar';

import UserProvider from './Context/User-Context';
import HeaderBar from './components/HeaderBar/HeaderBar';

function App() {
  return (
    <UserProvider>
    <div className='App'>
      <div className='NavBar'>
        <NavBar />
      </div>
      <div className='Page'>
        <HeaderBar />
        <ProjectDashBoard />
      </div>
    </div>
    </UserProvider>
  )
}

export default App;
