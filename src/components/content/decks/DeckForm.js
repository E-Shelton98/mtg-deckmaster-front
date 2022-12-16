import React, { useState } from 'react'
//Import axios for fetch requests
import axios from 'axios'

//Import the style sheet that is specific to this component
//Style sheets are organized as a mirror to the component organization

import '../../../styles/decks/deck-form.css'

//////////////////////////////////////////////////////////////////////////////////////////////
//PRIMARY FILE COMMENTS

//DeckForm component function to establish the creation of a form for passing parameters as an axios request to the backend for searching of the database
//The DeckForm component receives one single prop named "getDecks" which is a function in the parent Decks component
//getDecks is used to concat the searched data as well as set the "decks" state in the parent component to the received data

//////////////////////////////////////////////////////////////////////////////////////////////
//FILE COMPONENT FUNCTION

function DeckForm({ getDecks }) {
  //LEGALITY === FORMAT IN DB (ie. format = standard means LEGAL in standard)
  const [deckLegality, setDeckLegality] = useState('Standard')
  const [deckName, setDeckName] = useState('')

  //Create state "checkedState" to keep track of the deck color checkboxes checked by the user for creating the deckColor variable for the search query
  const [checkedState, setCheckedState] = useState({
    black: false,
    green: false,
    red: false,
    blue: false,
    white: false,
    multicolored: false,
  })

  //Async function for creating the query to send to the backend to search for decks
  //Input variables are "checkedState", "deckName", and "e"
  //checkedState is the state variable for keeping track of the user inputs on the deck color checkboxes
  //deckName is the value of the name input field of the form
  //e is the stand-in for the event variable to be used to prevent the default refresh on the form's submission
  async function searchDecks(checkedState, deckName, e) {
    e.preventDefault()

    //Create variables "deckSearchStrings" and "promises" as empty arrays to be used later for processing form input data before querying
    let deckSearchStrings = []
    let promises = []

    //Function to convert the checkbox inputs of the form into a string of letters relating to the various colors of magic for querying
    //Database requires colors in order of 'BGRUW' to be able to find decks
    //Example Input: CheckedState = {'black': true, 'green': false, 'red': true, 'blue': true, 'white': false}
    //Example Output: deckColor = ['B','R','U']
    let deckColorStringFunction = function (checkedState) {
      let deckColor = []
      if (checkedState['black']) {
        deckColor.push('B')
      }
      if (checkedState['green']) {
        deckColor.push('G')
      }
      if (checkedState['red']) {
        deckColor.push('R')
      }
      if (checkedState['blue']) {
        deckColor.push('U')
      }
      if (checkedState['white']) {
        deckColor.push('W')
      }

      return deckColor
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

    //Initialize variable "deckColor" which will be an array of strings related to the color of searched decks
    //Example: deckColor = ['B','R',W']
    let deckColor = deckColorStringFunction(checkedState)

    //Initialize variable "capitalizedName" to hold the value of the deck name input after capitalization of the first letter of each word
    let capitalizedName = ''

    //If a deck name is given in the search form, then capitalize the first letter of each word
    if (deckName !== '') {
      capitalizedName = capitalizeNameFunction(deckName)
    }

    //Create the axios get request string for each color of deckColor, so that the user can receive results for all colors together
    //Example: Create the request string for Black, Red, and White decks separately, then if "multicolored" is true, create the string for Black/Red/White decks as well and return all requests together in the array "deckSearchStrings"
    for (let color of deckColor) {
      try {
        let deckAxiosString = `https://deckmaster.onrender.com/decks?format=${deckLegality}&colors=${color}&name=${capitalizedName}`

        deckSearchStrings.push(deckAxiosString)
      } catch (err) {
        console.error(err)
      }
    }

    if ((Array.isArray(deckColor)) && (!deckColor.length)) {
      try {
        let deckAxiosString = `https://deckmaster.onrender.com/decks?format=${deckLegality}&name=${deckName}`

        deckSearchStrings.push(deckAxiosString)
      } catch (err) {
        console.error(err)
      }
    }

    if (checkedState['multicolored'] === true) {
      deckColor = deckColor.join('')
      try {
        let deckAxiosString = `https://deckmaster.onrender.com/decks?format=${deckLegality}&colors=${deckColor}&name=${capitalizedName}`

        deckSearchStrings.push(deckAxiosString)
      } catch (err) {
        console.error(err)
      }
    }

    console.log(deckSearchStrings)

    for (let searchString of deckSearchStrings) {
      promises.push(axios.get(searchString))
    }

    Promise.all(promises)
      .then((results) => {
        getDecks(results)
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
      <form id='deck-form'
        onSubmit={(e) => {
          searchDecks(checkedState, deckName, e)
        }}>
        <select
          id='format'
          onChange={(e) => {
            setDeckLegality(e.target.value)
          }}>
          <option value='standard'>Standard</option>
          <option value='commander'>Commander</option>
          <option value='modern'>Modern</option>
          <option value='historic'>Historic</option>
          <option value='pauper'>Pauper</option>
        </select>
        <input
          type='text'
          placeholder='Deck Name'
          onChange={(e) => {
            setDeckName(e.target.value)
          }}
          value={deckName}
        />
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
        <button type=''>Search Decks</button>
      </form>
    </div>
  )
}

export default DeckForm
