import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DeckForm from './DeckForm'
import DeckList from './DeckList'

function Decks() {
  const [decks, setDecks] = useState([])

  async function getDecks(deckAxiosRes) {
    if (deckAxiosRes !== undefined) {
      let decksResponse = []
      for (const deckGroup of deckAxiosRes) {
        decksResponse = decksResponse.concat(deckGroup.data)
      }

      setDecks(decksResponse)
    }
  }

  useEffect(() => {
    getDecks()
  }, [])

  return (
    <div>
      <DeckForm getDecks={getDecks} />
      <DeckList decks={decks} />
    </div>
  )
}

export default Decks
