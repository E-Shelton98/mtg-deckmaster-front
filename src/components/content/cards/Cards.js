import React, { useEffect, useState } from 'react'

//Import the CardForm component to create the form used for searching for cards
import CardForm from './CardForm'

//Import the CardList component to create the pagination component used to display the search results
import CardList from './CardList'

//Import the style sheet that is specific to this component 
//Style Sheets are organized as a mirror to the component organization
import '../../../styles/cards/cards.css'

//////////////////////////////////////////////////////////////////////////////////////////////
//PRIMARY FILE COMMENTS

//Cards component function to establish a parent component for the card search and display functionalities of the site. Intended to be used as both a separate page, as well as imported into the deck building section of the site.

//Cards does not receive any props, but it does pass many to its children components CardForm and CardList.

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
//CARDFORM
//CardForm receives the prop "getCards" which is the function of same name which receives and concats the search data from the CardForm

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
//CARDLIST
//CardList receives the props "cards", "pageLimit", and "dataLimit"
//Cards is the card data that has been returned from the search
//PageLimit is the limit of pages shown in the page selection bar at one time
//DataLimit is the limit of cards shown on a page at one time

//////////////////////////////////////////////////////////////////////////////////////////////
//PRIMARY FILE FUNCTION

function Cards() {
  //Create state variables cards and setCards to keep track of the search results requested by the user
  const [cards, setCards] = useState([])

  //Async function getCards which is passed to the CardForm component and receives an array of strings to be used as requests to the server
  //This function also concat's the various search requests if needed to provide a clean response of multiple colors of card at once
  async function getCards(cardAxiosRes) {
  console.log(cardAxiosRes)
    if (cardAxiosRes !== undefined) {
      let cardsResponse = []
      for (const cardGroup of cardAxiosRes) {
        cardsResponse = cardsResponse.concat(cardGroup.data)
      }
      
      setCards(cardsResponse)
    }
  }

  //useEffect of getCards so that the cards page can be updated with cards on any update
  //May tweak this so that the cards page starts with showing a set of cards already
  useEffect(() => {
    getCards()
  }, [])

  return (
    <div id='card-page'>
      <CardForm getCards={getCards} />
      {cards.length > 0 ? (
        <>
          <CardList
            cards={cards}
            pageLimit={5}
            dataLimit={8}
          />
        </>
      ) : (
        <h1 style={{color: 'white'}}>No Cards to Display</h1>
      )}
    </div>
  )
}

export default Cards
