import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import LogoutBtn from '../auth/LogoutBtn'
import '../../styles/layout/navbar.css'

function Navbar() {
  const { loggedIn } = useContext(AuthContext)

  return (
    <div className='container'>
      <div className='nav-links'>
        <Link className='link' to='/'>
          Home
        </Link>
        {loggedIn === false && (
          <>
            <Link className='link' to='/register'>
              Register
            </Link>
            <Link className='link' to='/login'>
              Login
            </Link>
            <Link className='link' to='/cards'>
              Cards
            </Link>
          </>
        )}
        {loggedIn === true && (
          <>
            <Link className='link' to='/decks'>
              Decks
            </Link>
            <Link className='link' to='/cards'>
              Cards
            </Link>
          </>
        )}
      </div>
      {loggedIn === true && (
        <>
          <LogoutBtn />
        </>
      )}
    </div>
  )
}

export default Navbar
