import React, { useState } from 'react'
import axios from 'axios'

function DeckForm({ getDecks }) {
  //LEGALITY === FORMAT IN DB (ie. format = standard means LEGAL in standard)
  const [deckLegality, setDeckLegality] = useState('Standard')
  const [deckName, setDeckName] = useState('')

  const [checkedState, setCheckedState] = useState({
    black: false,
    green: false,
    red: false,
    blue: false,
    white: false,
    multicolored: false,
  })

  async function searchDecks(checkedState, deckName, e) {
    e.preventDefault()

    let deckSearchStrings = []
    let promises = []

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

    function capitalizeNameFunction(textInput) {
      let words = textInput.split(' ')

      for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1)
      }

      words = words.join(' ')

      return words
    }

    let deckColor = deckColorStringFunction(checkedState)

    let capitalizedName = ''

    if (deckName !== '') {
      capitalizedName = capitalizeNameFunction(deckName)
    }

    for (let color of deckColor) {
      try {
        let deckAxiosString = `http://localhost:5000/decks?format=${deckLegality}&colors=${color}&name=${capitalizedName}`

        deckSearchStrings.push(deckAxiosString)
      } catch (err) {
        console.error(err)
      }
    }

    if (checkedState['multicolored'] === true) {
      deckColor = deckColor.join('')
      try {
        let deckAxiosString = `http://localhost:5000/decks?format=${deckLegality}&colors=${deckColor}&name=${capitalizedName}`

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
      <form
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
          <input
            type='checkbox'
            id='color-black'
            name='color'
            value='black'
            onClick={(e) => {
              handleCheckboxClick(e.target.value)
            }}></input>
          <input
            type='checkbox'
            id='color-green'
            name='color'
            value='green'
            onClick={(e) => {
              handleCheckboxClick(e.target.value)
            }}></input>
          <input
            type='checkbox'
            id='color-red'
            name='color'
            value='red'
            onClick={(e) => {
              handleCheckboxClick(e.target.value)
            }}></input>
          <input
            type='checkbox'
            id='color-blue'
            name='color'
            value='blue'
            onClick={(e) => {
              handleCheckboxClick(e.target.value)
            }}></input>
          <input
            type='checkbox'
            id='color-white'
            name='color'
            value='white'
            onClick={(e) => {
              handleCheckboxClick(e.target.value)
            }}></input>
          <input
            type='checkbox'
            id='color-multicolored'
            name='color'
            value='multicolored'
            onClick={(e) => {
              handleCheckboxClick(e.target.value)
            }}></input>
        </div>
        <button type=''>Search Decks</button>
      </form>
    </div>
  )
}

export default DeckForm
