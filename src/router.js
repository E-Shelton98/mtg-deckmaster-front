import React, { useContext } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Register from './components/auth/Register.js'
import Login from './components/auth/Login.js'
import Navbar from './components/layout/Navbar.js'
import AuthContext from './context/AuthContext.js'
import Decks from './components/content/decks/Decks.js'
import Cards from './components/content/cards/Cards.js'

function Router() {
  const { loggedIn } = useContext(AuthContext)

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path='/'>
          <div>Home Page</div>
        </Route>
        {loggedIn === false && (
          <>
            <Route exact path='/register'>
              <Register />
            </Route>
            <Route exact path='/login'>
              <Login />
            </Route>
          </>
        )}
        {loggedIn === true && (
          <>
            <Route exact path='/decks'>
              <Decks />
            </Route>
            <Route exact path='/cards'>
              <Cards />
            </Route>
          </>
        )}
      </Switch>
    </BrowserRouter>
  )
}

export default Router
