import React from 'react';

import './App.css';

import ProjectDashBoard from './pages/ProjectDashboard/ProjectDashBoard';
import NavBar from './components/NavBar/NavBar';

import { UserContext } from './Context/User-Context';

function App() {
  return (
    <UserContext.Provider value={ { dashBoardTicketView: 'horizontal' } }>
    <div className='App'>
      <div className='NavBar'>
        <NavBar />
      </div>
      <div className='Page'>
        <ProjectDashBoard />
      </div>
    </div>
    </UserContext.Provider>
  )
}

export default App;
