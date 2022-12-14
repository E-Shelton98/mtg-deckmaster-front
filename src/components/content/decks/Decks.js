import React, { useEffect, useState } from 'react'

//Import the DeckForm component to create the form used for searching for decks
import DeckForm from './DeckForm'

//Import the DeckList component to create the pagination component used to display the search results
import DeckList from './DeckList'

//Import the NewDeck component to function as a separate page for creating a new deck <<--- NOT WORKING YET --->>
import NewDeck from './NewDeck'

//////////////////////////////////////////////////////////////////////////////////////////////
//PRIMARY FILE COMMENTS

//Decks component function to establish a parent component for the deck search, display, and creation functionalities of the site. Intended to be used as a separate page within the site.

//Decks does not receive any props, but it does pass many to its children components DeckForm and DeckList.

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
//DECKFORM
//DeckForm receives the prop "getDecks" which is the function of same name which receives and concats the search data from the DeckForm

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
//DECKLIST
//DeckList receives the props "decks", "pageLimit", and "dataLimit"
//Decks is the deck data that has been returned from the search
//PageLimit is the limit of pages shown in the page selection bar at one time
//DataLimit is the limit of decks shown on a page at one time

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
//NewDeck
//NewDeck currently does not receive any props, but is still under construction so that will change as needed

//////////////////////////////////////////////////////////////////////////////////////////////
//PRIMARY FILE FUNCTION

function Decks() {
  //Create state variables decks and setDecks to keep track of the search results requested by the user
  const [decks, setDecks] = useState([])

  //Async function getDecks which is passed to the DeckForm component and receives an array of strings to be used as requests to the server
  //This function also concat's the various search requests if needed to provide a clean response of multiple colors of card at once
  async function getDecks(deckAxiosRes) {
    console.log(deckAxiosRes)
    if (deckAxiosRes !== undefined) {
      let decksResponse = []
      for (const deckGroup of deckAxiosRes) {
        console.log(deckGroup.data)
        decksResponse = decksResponse.concat(deckGroup.data)
      }

      setDecks(decksResponse)
    }
    console.log('decks: ', decks)
  }

  //useEffect of getDecks so that the decks page can be updated with decks on any update
  //May tweak this so that the decks page starts with showing a set of decks already
  useEffect(() => {
    getDecks()
  })

  return (
    <div>
      <DeckForm getDecks={getDecks} />
      <DeckList decks={decks} pageLimit={5} dataLimit={8} />
      <button>New Deck</button>
    </div>
  )
}

export default Decks
