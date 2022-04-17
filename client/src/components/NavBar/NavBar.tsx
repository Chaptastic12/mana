import React from 'react'
import { useNavigate } from 'react-router-dom'
import './NavBar.css'

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <div className='NavBar'>
      <div onClick={ () => navigate('/') }>
        <h1> MANA</h1>
      </div>
    </div>
  )
}

export default NavBar