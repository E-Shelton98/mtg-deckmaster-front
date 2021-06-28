import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Register from './components/Auth/Register'
import Navbar from './components/layout/Navbar'

export default function router() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Switch>
        <Route exact path='/'>
          <div>Home</div>
        </Route>
        <Route exact path='/register'>
          <Register/>
        </Route>
        <Route exact path='/login'>
          <div>Login</div>
        </Route>
        <Route exact path='/decks'>
          <div>Decks</div>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
