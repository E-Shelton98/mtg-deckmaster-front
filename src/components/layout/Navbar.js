import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import LogoutBtn from '../auth/LogoutBtn'

function Navbar() {
  const { loggedIn } = useContext(AuthContext)

  return (
    <div>
      <Link to='/'>Home</Link>
      {loggedIn === false && (
        <>
          <Link to='/register'>Register</Link>
          <Link to='/login'>Login</Link>
          <Link to='/cards'>Cards</Link>
        </>
      )}
      {loggedIn === true && (
        <>
          <Link to='/decks'>Decks</Link>
          <Link to='/cards'>Cards</Link>
          <LogoutBtn />
        </>
      )}
    </div>
  )
}

export default Navbar
