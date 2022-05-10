import React, { useContext, useState } from 'react'
import axios from 'axios'
import AuthContext from '../../context/AuthContext'
import { useHistory } from 'react-router-dom'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { getLoggedIn } = useContext(AuthContext)
  const history = useHistory()

  async function login(e) {
    e.preventDefault()

    try {
      const loginData = {
        username,
        password,
      }

      await axios.post('http://localhost:5000/auth/login', loginData)
      await getLoggedIn()
      history.push('/')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <h1>Login to your account</h1>
      <form onSubmit={login}>
        <input
          placeholder='Username'
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <input
          type='password'
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login
