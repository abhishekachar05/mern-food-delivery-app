import React from 'react'
import './Navbar.css'
import { assets } from './../../assets/assets'
import { toast } from 'react-toastify'

const Navbar = ({ setToken }) => {
  const handleLogout = () => {
    setToken('')
    toast.info('Logged out successfully')
  }

  return (
    <div className='navbar'>
      <img className='logo' src={assets.logo} alt='Logo' />
      <div className='navbar-right'>
        <button className='logout-btn' onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Navbar