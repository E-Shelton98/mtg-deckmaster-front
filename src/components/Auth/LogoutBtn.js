import React, { useContext } from 'react'
import axios from 'axios'
import AuthContext from '../../context/AuthContext'
import { useHistory } from 'react-router-dom'

function LogoutBtn() {
  const { getLoggedIn } = useContext(AuthContext)

  const history = useHistory()

  async function logout() {
    await axios.get('https://deckmaster.herokuapp.com/auth/logout')
    await getLoggedIn()
    history.push('/')
  }

  return <button onClick={logout}>Log Out</button>
}

export default LogoutBtn
