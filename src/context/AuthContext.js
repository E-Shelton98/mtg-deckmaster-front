import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

const AuthContext = createContext()

function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(undefined)

  async function getLoggedIn() {
    const loggedInRes = await axios.get(
      'https://deckmaster.herokuapp.com/auth/loggedIn'
    )
    console.log(loggedInRes.data)
    setLoggedIn(loggedInRes.data)
  }

  useEffect(() => {
    getLoggedIn()
  }, [])

  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext
export { AuthContextProvider }
