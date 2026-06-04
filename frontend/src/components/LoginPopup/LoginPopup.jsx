import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from './../context/StoreContext';
import axios from 'axios'
import { toast } from 'react-toastify'

const LoginPopup = ({setShowLogin}) => {

    const {url, setToken} = useContext(StoreContext)

    const [currentState, setCurrentState] = useState('Login')
    const [data, setData] = useState({
        name:"",
        email:"",
        password:""
    })
    const [loading, setLoading] = useState(false)

    const onChangeHandler = (event) =>{
        const name = event.target.name
        const value = event.target.value 
        setData(data=>({...data,[name]:value}))
    }

   const onLogin = async (event) =>{
        event.preventDefault()
        setLoading(true)
        try {
            let newUrl = url;
            if(currentState === 'Login'){
                newUrl += "/api/user/login"
            } else {
                newUrl += "/api/user/register"
            }

            const response = await axios.post(newUrl, data);

            if(response.data.success){
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token)
                setShowLogin(false);
                toast.success(currentState === 'Login' ? 'Logged in successfully!' : 'Account created successfully!')
            } else {
                toast.error(response.data.message || 'Something went wrong')
            }
        } catch (error) {
            toast.error('Server error. Please try again.')
            console.error(error)
        } finally {
            setLoading(false)
        }
   }

  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currentState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="Close" />
            </div>
            <div className="login-popup-inputs">
                {currentState === 'Login' ? <></> :
                    <input
                        name='name'
                        onChange={onChangeHandler}
                        value={data.name}
                        type="text"
                        placeholder='Your name'
                        required
                    />
                }
                <input
                    name='email'
                    onChange={onChangeHandler}
                    value={data.email}
                    type="email"
                    placeholder='Your email'
                    required
                />
                <input
                    name='password'
                    onChange={onChangeHandler}
                    value={data.password}
                    type="password"
                    placeholder='Password'
                    required
                />
            </div>

            <button type='submit' disabled={loading}>
                {loading ? 'Please wait...' : currentState === 'Sign Up' ? 'Create account' : 'Login'}
            </button>
            <div className="login-popup-condition">
                <input type="checkbox" required />
                <p>By continuing, I agree to the terms of use &amp; privacy policy</p>
            </div>
            {currentState === 'Login'
             ? <p>Create a new account? <span onClick={()=> setCurrentState('Sign Up')}>Click here</span></p>
             : <p>Already have an account? <span onClick={()=> setCurrentState('Login')}>Login here</span></p>
            }
        </form>
    </div>
  )
}

export default LoginPopup