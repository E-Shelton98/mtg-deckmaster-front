import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const { getLoggedIn } = useContext(AuthContext)
  const history = useHistory()

  async function register(e) {
    e.preventDefault()

    try {
      const registerData = {
        email,
        password,
        username,
      }

      await axios.post('https://deckmaster.herokuapp.com/auth/', registerData)
      await getLoggedIn()
      history.push('/')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <h1>Register a new account</h1>
      <form onSubmit={register}>
        <input
          placeholder='Username'
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <input
          type='email'
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type='password'
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button type='submit'>Register</button>
      </form>
    </div>
  )
}

export default Register
