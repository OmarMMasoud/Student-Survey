import React from 'react'
import { useNavigate }from 'react-router-dom'
import img from '../style/logo.jpg'
import '../style/App.css'

function Nav(){
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/')
  }

  return (
    <div className='nav'>
      <div className="logo" onClick={handleLogoClick}>
        <img src={img} alt="logo" />
      </div>
      <h1>professional interests</h1>
    </div>
  ); // Add the return statement here
}

export default Nav;