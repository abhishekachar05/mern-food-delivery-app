import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Routes, Route, Navigate } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import Login from './pages/Login/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const url = 'http://localhost:4000'
  const [token, setToken] = useState(localStorage.getItem('admin-token') || '')

  useEffect(() => {
    if (token) {
      localStorage.setItem('admin-token', token)
    } else {
      localStorage.removeItem('admin-token')
    }
  }, [token])

  if (!token) {
    return (
      <>
        <ToastContainer />
        <Login url={url} setToken={setToken} />
      </>
    )
  }

  return (
    <div>
      <ToastContainer />
      <Navbar token={token} setToken={setToken} />
      <hr />
      <div className='app-content'>
        <Sidebar />
        <Routes>
          <Route path='/add' element={<Add url={url} token={token} />} />
          <Route path='/list' element={<List url={url} token={token} />} />
          <Route path='/orders' element={<Orders url={url} token={token} />} />
          <Route path='*' element={<Navigate to='/orders' replace />} />
        </Routes>
      </div>
    </div>
  )
}

export default App