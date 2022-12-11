import React, { useState } from 'react'
//Import axios for fetch requests
import axios from 'axios'

//Import the style sheet that is specific to this component
//Style sheets are organized as a mirror to the component organization

import '../../../styles/cards/card-form.css'

//////////////////////////////////////////////////////////////////////////////////////////////
//PRIMARY FILE COMMENTS

//CardForm component function to establish the creation of a form for passing parameters as an axios request to the backend for searching of the database
//The CardForm component receives one single prop named "getCards" which is a function in the parent Cards component
//getCards is used to concat the searched data as well as set the "cards" state in the parent component to the data

//////////////////////////////////////////////////////////////////////////////////////////////
//FILE COMPONENT FUNCTION

function CardForm({ getCards }) {
  //LEGALITY === FORMAT IN DB (ie. format = standard means LEGAL in standard)
  const [cardLegality, setCardLegality] = useState('standard')
  //A restricted card is one with separate card count rulings (ie. Only 1 black lotus in a legal Vintage deck)
  const [cardRestricted, setCardRestricted] = useState(false)

  //Create state "checkedState" to keep track of the card color checkboxes checked by the user for creating the cardColor variable for the search query
  const [checkedState, setCheckedState] = useState({
    black: false,
    green: false,
    red: false,
    blue: false,
    white: false,
    colorless: false,
    multicolored: false,
  })

  //Create state "cardCMC" to hold value of CMC (Converted Mana Cost) of a card for searching
  const [cardCMC, setCardCMC] = useState('')

  //Create state "cardIsLand" to hold boolean value of whether searching for a land type card
  const [cardIsLand, setCardIsLand] = useState(false)

  //Create state "cardName" to hold the input value of a card's specific name
  //If used, this value is upper cased (ie "zephyr boots" is changed to "Zephyr Boots") due to strict upper casing being needed for the search query
  const [cardName, setCardName] = useState('')

  //Async function for creating the query to send to the backend to search for cards
  //Input variables are "checkedState", "cardIsLand", "cardName", and "e"
  //checkedState is the state variable for keeping track of user inputs on the card color checkboxes
  //cardIsLand is a boolean state variable to keep track of whether the user is searching for a land since it has a specific query string parameter of cardType
  //cardName is the value of the name input field of the form
  //e is the stand-in for the event variable to be used to prevent the default refresh on the form's submission
  async function searchCards(checkedState, cardIsLand, cardName, e) {
    //Create variables "cardSearchStrings" and "promises" as empty arrays to be used later for processing form input data before querying
    let cardSearchStrings = []
    let promises = []
    e.preventDefault()

    //Function to convert the checkbox inputs of the form into a string of letters relating to the various colors of magic for querying.
    //Database requires colors in order of 'BGRUW' to be able to find cards.
    //Example Input: CheckedState = {'black': true, 'green': false, 'red': true, 'blue': true, 'white': false}
    //Example Output: cardColor = ['B','R','U']
    function cardColorStringFunction(checkedState) {
      let cardColor = []

      if (checkedState['black']) {
        cardColor.push('B')
      }
      if (checkedState['green']) {
        cardColor.push('G')
      }
      if (checkedState['red']) {
        cardColor.push('R')
      }
      if (checkedState['blue']) {
        cardColor.push('U')
      }
      if (checkedState['white']) {
        cardColor.push('W')
      }

      return cardColor
    }

    //Function to capitalize the first letter of each word of the name input
    //Example Input: 'zephyr boots'
    //Example Output: 'Zephyr Boots'
    function capitalizeNameFunction(textInput) {
      let words = textInput.split(' ')

      for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1)
      }

      words = words.join(' ')

      return words
    }

    //Initialize variable "cardColor" which will be an array of strings related to the color of searched cards
    //Example: cardColor = ['B','R','W']
    let cardColor = cardColorStringFunction(checkedState)
    console.log(cardColor)

    //Initialize variable "capitalizedName" to hold the value of the card name input after capitalization of the first letter of each word
    let capitalizedName = ''

    //If a card name is given in the search form, then capitalize the first letter of each word
    if (cardName !== '') {
      capitalizedName = capitalizeNameFunction(cardName)
    }

    //Initialize variable "cardType" to hold the value of which type of card is being searched
    let cardType = ''

    //If the boolean cardIsLand is true, then the card type is Land and cardType must be set to land for the query
    if (cardIsLand) {
      cardType = 'Land'
    }

    if (cardColor === []) {
      //cardAxiosString will always have the cardLegality parameter
      let cardAxiosString = `https://deckmaster.onrender.com/cards?format=${cardLegality}`
      //If any of the following parameters are present than append them to the cardAxiosString
      if (capitalizedName !== '') {
        cardAxiosString = cardAxiosString + `&name=${capitalizedName}`
      }
      if (cardCMC !== '') {
        cardAxiosString = cardAxiosString + `&cmc=${cardCMC}`
      }
      if (cardRestricted === true) {
        cardAxiosString = cardAxiosString + `&restricted=true`
      }
      if (cardType !== '') {
        cardAxiosString = cardAxiosString + `&type_line=${cardType}`
      }
      //Once the cardAxiosString is complete push it into the cardSearchStrings array
      cardSearchStrings.push(cardAxiosString)
    }

    //Create the axios get request string for each color of cardColor, so that the user can receive results for all colors together
    //Example: Create the request string for Black, Red, and White cards separately, and then if "multicolored" is true, create the string for Black/Red/White cards as well and return all requests together in the array "cardSearchStrings"
    for (let color of cardColor) {
      //cardAxiosString will always have the cardLegality and colors parameters
      let cardAxiosString = `https://deckmaster.onrender.com/cards?format=${cardLegality}&colors=${color}`
      //If any of the following parameters are present than append them to the cardAxiosString
      if (capitalizedName !== '') {
        cardAxiosString = cardAxiosString + `&name=${capitalizedName}`
      }
      if (cardCMC !== '') {
        cardAxiosString = cardAxiosString + `&cmc=${cardCMC}`
      }
      if (cardRestricted === true) {
        cardAxiosString = cardAxiosString + `&restricted=true`
      }
      if (cardType !== '') {
        cardAxiosString = cardAxiosString + `&type_line=${cardType}`
      }
      //Once the cardAxiosString is complete push it into the cardSearchStrings array
      cardSearchStrings.push(cardAxiosString)
    }

    if (checkedState['colorless'] === true) {
      //cardAxiosString will always have the cardLegality and colors parameters
      let cardAxiosString = `https://deckmaster.onrender.com/cards?format=${cardLegality}`
      //If any of the following parameters are present than append them to the cardAxiosString
      if (capitalizedName !== '') {
        cardAxiosString = cardAxiosString + `&name=${capitalizedName}`
      }
      if (cardCMC !== '') {
        cardAxiosString = cardAxiosString + `&cmc=${cardCMC}`
      }
      if (cardRestricted === true) {
        cardAxiosString = cardAxiosString + `&restricted=true`
      }
      if (cardType !== '') {
        cardAxiosString = cardAxiosString + `&type_line=${cardType}`
      }
      //Once the cardAxiosString is complete push it into the cardSearchStrings array
      cardSearchStrings.push(cardAxiosString)
    }

    if (checkedState['multicolored'] === true) {
      cardColor = cardColor.join('')
      //cardAxiosString will always have the cardLegality and colors parameters
      let cardAxiosString = `https://deckmaster.onrender.com/cards?format=${cardLegality}&colors=${cardColor}`
      //If any of the following parameters are present than append them to the cardAxiosString
      if (capitalizedName !== '') {
        cardAxiosString = cardAxiosString + `&name=${capitalizedName}`
      }
      if (cardCMC !== '') {
        cardAxiosString = cardAxiosString + `&cmc=${cardCMC}`
      }
      if (cardRestricted === true) {
        cardAxiosString = cardAxiosString + `&restricted=true`
        console.log(cardAxiosString)
      }
      if (cardType !== '') {
        cardAxiosString = cardAxiosString + `&type_line=${cardType}`
      }
      //Once the cardAxiosString is complete push it into the cardSearchStrings array
      cardSearchStrings.push(cardAxiosString)
    }
    console.log(cardSearchStrings)
    //getCards(cardSearchResults)

    for (let searchString of cardSearchStrings) {
      promises.push(axios.get(searchString))
    }

    Promise.all(promises)
      .then((results) => {
        getCards(results)
      })
      .catch((e) => {
        console.log('An error happened: ', e.error)
      })
  }

  function handleCheckboxClick(clickedCheckbox) {
    let updatedColor = { [clickedCheckbox]: !checkedState[clickedCheckbox] }
    console.log('handleCheckboxClick updatedColor: ', updatedColor)
    setCheckedState((checkedState) => ({
      ...checkedState,
      ...updatedColor,
    }))

    console.log('handleCheckboxClick checkedState: ', checkedState)
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          searchCards(checkedState, cardIsLand, cardName, e)
        }}>
        <select
          id='format'
          onChange={(e) => {
            setCardLegality(e.target.value)
          }}>
          <option value='standard'>Standard</option>
          <option value='commander'>Commander</option>
          <option value='modern'>Modern</option>
          <option value='historic'>Historic</option>
          <option value='pauper'>Pauper</option>
          <option value='vintage'>Vintage</option>
        </select>

        <label className='checkbox'>
          <input
            type='checkbox'
            id='restricted'
            name='restricted-modifier'
            onChange={() => {
              setCardRestricted(!cardRestricted)
            }}
          />
          <span id='restricted-check'></span>
        </label>

        <div className='color-checkboxes'>
          <label className='checkbox'>
            <input
              type='checkbox'
              id='color-black'
              name='color'
              value='black'
              onClick={(e) => {
                handleCheckboxClick(e.target.value)
              }}></input>
            <span id='black-check'></span>
          </label>
          <label className='checkbox'>
            <input
              type='checkbox'
              id='color-green'
              name='color'
              value='green'
              onClick={(e) => {
                handleCheckboxClick(e.target.value)
              }}></input>
            <span id='green-check'></span>
          </label>
          <label className='checkbox'>
            <input
              type='checkbox'
              id='color-red'
              name='color'
              value='red'
              onClick={(e) => {
                handleCheckboxClick(e.target.value)
              }}></input>
            <span id='red-check'></span>
          </label>
          <label className='checkbox'>
            <input
              type='checkbox'
              id='color-blue'
              name='color'
              value='blue'
              onClick={(e) => {
                handleCheckboxClick(e.target.value)
              }}></input>
            <span id='blue-check'></span>
          </label>
          <label className='checkbox'>
            <input
              type='checkbox'
              id='color-white'
              name='color'
              value='white'
              onClick={(e) => {
                handleCheckboxClick(e.target.value)
              }}></input>
            <span id='white-check'></span>
          </label>
          <label className='checkbox'>
            <input
              type='checkbox'
              id='color-multicolored'
              name='color'
              value='multicolored'
              onClick={(e) => {
                handleCheckboxClick(e.target.value)
              }}></input>
            <span id='multicolored-check'></span>
          </label>
          <label className='checkbox'>
            <input
              type='checkbox'
              id='color-colorless'
              name='color'
              value='colorless'
              onClick={(e) => {
                handleCheckboxClick(e.target.value)
              }}></input>
              <span id='colorless-check'></span>
          </label>
        </div>
        <input
          type='checkbox'
          id='isLand'
          name='land'
          onChange={() => {
            setCardIsLand(!cardIsLand)
          }}></input>
        <input
          type='text'
          placeholder='Card CMC'
          onChange={(e) => {
            setCardCMC(e.target.value)
          }}
          value={cardCMC}
        />
        <input
          type='text'
          placeholder='Card Name'
          onChange={(e) => {
            setCardName(e.target.value)
          }}
          value={cardName}
        />
        <button type=''>Search Cards</button>
      </form>
    </div>
  )
}

export default CardForm
