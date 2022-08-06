import React, { useState } from 'react'
import axios from 'axios'

function CardForm({ getCards }) {
  //LEGALITY === FORMAT IN DB (ie. format = standard means LEGAL in standard)
  const [cardLegality, setCardLegality] = useState('standard')
  const [cardRestricted, setCardRestricted] = useState(false)

  const [checkedState, setCheckedState] = useState({
    black: false,
    green: false,
    red: false,
    blue: false,
    white: false,
    multicolored: false,
  })

  //Create state to hold value of CMC (Converted Mana Cost) of a card for searching
  const [cardCMC, setCardCMC] = useState('')

  //Create state to hold boolean value of whether searching for a land type card
  const [cardIsLand, setCardIsLand] = useState(false)

  //SEARCH MUST BE STRICT UPPER CASING OF FIRST LETTER (ie. Zephyr Boots)
  const [cardName, setCardName] = useState('')

  async function searchCards(checkedState, cardIsLand, cardName, e) {
    let cardSearchResults = []
    let cardSearchStrings = []
    let promises = []
    e.preventDefault()

    let cardColorStringFunction = function (checkedState) {
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

    let capitalizeNameFunction = function (textInput) {
      let words = textInput.split(' ')

      for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1)
      }

      words = words.join(' ')

      return words
    }

    let cardColor = cardColorStringFunction(checkedState)

    let capitalizedName = ''

    if (cardName !== '') {
      capitalizedName = capitalizeNameFunction(cardName)
    }

    let cardType = ''
    if (cardIsLand) {
      cardType = 'Land'
    }

    for (let color of cardColor) {
      try {
        if (cardType === 'Land') {
          let cardFetchString = `http://localhost:5000/cards?format=${cardLegality}&colors=${color}&cmc=${cardCMC}&name=${capitalizedName}&type_line=${cardType}`
          if (cardCMC !== '') {
            cardFetchString = cardFetchString + `&cmc=${cardCMC}`
          }
          if (cardRestricted === true) {
            cardFetchString = cardFetchString + `&restricted=true`
          }
          cardSearchStrings.push(cardFetchString)
        } else {
          let cardFetchString = `http://localhost:5000/cards?format=${cardLegality}&colors=${color}&cmc=${cardCMC}&name=${capitalizedName}`
          if (cardCMC !== '') {
            cardFetchString = cardFetchString + `&cmc=${cardCMC}`
          }
          if (cardRestricted === true) {
            cardFetchString = cardFetchString + `&restricted=true`
          }
          cardSearchStrings.push(cardFetchString)
        }
      } catch (err) {
        console.error(err)
      }
    }

    if (checkedState['multicolored'] === true) {
      cardColor = cardColor.join('')
      try {
        if (cardType === 'Land') {
          let cardFetchString = `http://localhost:5000/cards?format=${cardLegality}&colors=${cardColor}&cmc=${cardCMC}&name=${capitalizedName}&type_line=${cardType}`
          if (cardCMC !== '') {
            cardFetchString = cardFetchString + `&cmc=${cardCMC}`
          }
          if (cardRestricted === true) {
            cardFetchString = cardFetchString + `&restricted=true`
          }
          let cards = await axios.get(cardFetchString)
          cardSearchResults.push(cards.data)
        } else {
          let cardFetchString = `http://localhost:5000/cards?format=${cardLegality}&colors=${cardColor}&cmc=${cardCMC}&name=${capitalizedName}`
          if (cardCMC !== '') {
            cardFetchString = cardFetchString + `&cmc=${cardCMC}`
          }
          if (cardRestricted === true) {
            cardFetchString = cardFetchString + `&restricted=true`
          }
          cardSearchStrings.push(cardFetchString)
        }
      } catch (err) {
        console.error(err)
      }
    }
    console.log(cardSearchStrings)
    //getCards(cardSearchResults)

    for (let searchString of cardSearchStrings) {
      promises.push(axios.get(searchString))
    }
    
    Promise.all(promises).then((results) => {
      getCards(results)
    }).catch((e) => {
      console.log("An error happened: ", e.error)
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
        </select>

        <input
          type='checkbox'
          id='restricted'
          name='restricted-modifier'
          onChange={() => {
            setCardRestricted(!cardRestricted)
          }}
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
