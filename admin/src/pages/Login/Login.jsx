import React, { useState } from 'react'
import './Login.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = ({ url, setToken }) => {
  const [data, setData] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axios.post(`${url}/api/user/adminlogin`, {
        email: data.email,
        password: data.password,
      })
      if (response.data.success) {
        setToken(response.data.token)
        localStorage.setItem('admin-token', response.data.token)
        toast.success('Login successful!')
      } else {
        toast.error(response.data.message || 'Invalid credentials')
      }
    } catch (error) {
      toast.error('Server error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='admin-login-wrapper'>
      <div className='admin-login-box'>
        <div className='admin-login-header'>
          <img src={assets.logo} alt='Logo' className='admin-login-logo' />
          <h2>Admin Panel</h2>
          <p>Sign in to manage your restaurant</p>
        </div>
        <form className='admin-login-form' onSubmit={onSubmitHandler}>
          <div className='admin-input-group'>
            <label htmlFor='email'>Email Address</label>
            <input
              id='email'
              type='email'
              name='email'
              placeholder='admin@example.com'
              value={data.email}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className='admin-input-group'>
            <label htmlFor='password'>Password</label>
            <input
              id='password'
              type='password'
              name='password'
              placeholder='Enter your password'
              value={data.password}
              onChange={onChangeHandler}
              required
            />
          </div>
          <button type='submit' className='admin-login-btn' disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
