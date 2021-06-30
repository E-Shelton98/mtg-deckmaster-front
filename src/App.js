import Router from './router';
import axios from 'axios'
import {AuthContextProvider} from './context/AuthContext'

axios.defaults.withCredentials = true

function App() {
  return <AuthContextProvider><Router></Router></AuthContextProvider>
}

export default App
