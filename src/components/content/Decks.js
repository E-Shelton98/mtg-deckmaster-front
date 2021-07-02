import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DeckForm from './DeckForm'
import DeckList from './DeckList'

function Decks() {
  const [decks, setDecks] = useState([])

  async function getDecks() {
    const decksRes = await axios.get('http://localhost:5000/decks')
    setDecks(decksRes.data)
  }

  useEffect(() => {
    getDecks()
  }, [])

  return (
    <div>
      <DeckForm getDecks={getDecks}/>
      <DeckList decks={decks}/>
    </div>
  )
}

export default Decks
