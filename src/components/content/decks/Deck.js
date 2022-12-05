import React from 'react'

//Import the style sheet that is specific to this component. Style sheets are organized as a mirror to the component organization
import '../../../styles/decks/deck.css'

//////////////////////////////////////////////////////////////////////////////////////////////
//PRIMARY FILE COMMENTS

//Deck component function to establish the display of an individual card and its relevant information
//The Deck component receives data from its parent component DeckList in the form of a single prop "data", which includes all of the data for that particular deck
//From the "data" prop you can access any relevant information needed to display the deck or it's alternative data

//////////////////////////////////////////////////////////////////////////////////////////////
//FILE COMPONENT FUNCTION

function Deck({ data }) {
  //Using the prop "data" return a deck name
  return <h1 className='deck'>{data.name}</h1>
}

export default Deck
