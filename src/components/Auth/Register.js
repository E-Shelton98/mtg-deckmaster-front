import React, { useState } from 'react'
import axios from 'axios'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function register(e) {
    e.preventDefault()

    try {
        const registerData = {
            email, password
        }

        await axios.post('http://localhost:5000/auth/', registerData)
    }
    catch(err) {
        console.log(err)
    }
  }

  return (
    <div>
      <h1>Register a new account</h1>
      <form onSubmit={register}>
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
