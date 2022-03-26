import React from 'react';

import './App.css';

import ProjectDashBoard from './pages/ProjectDashboard/ProjectDashBoard';
import NavBar from './components/NavBar/NavBar';

import UserProvider from './Context/User-Context';

function App() {
  return (
    <UserProvider>
    <div className='App'>
      <div className='NavBar'>
        <NavBar />
      </div>
      <div className='Page'>
        <ProjectDashBoard />
      </div>
    </div>
    </UserProvider>
  )
}

export default App;
