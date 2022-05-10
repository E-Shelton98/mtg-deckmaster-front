import React, { useState } from 'react'
import axios from 'axios'

function CardForm({ getCards }) {
  //LEGALITY === FORMAT IN DB (ie. format = standard means LEGAL in standard)
  const [cardLegality, setCardLegality] = useState('standard')
  const [cardRestricted, setCardRestricted] = useState(false)

  //TO SELECT A CARD THAT IS ALL COLORS AT ONCE DO BGRUW
  const [cardColorBlack, setCardColorBlack] = useState(false)
  const [cardColorGreen, setCardColorGreen] = useState(false)
  const [cardColorRed, setCardColorRed] = useState(false)
  const [cardColorBlue, setCardColorBlue] = useState(false)
  const [cardColorWhite, setCardColorWhite] = useState(false)
  const [cardCMC, setCardCMC] = useState('')

  //SEARCH MUST BE STRICT UPPER CASING OF FIRST LETTER (ie. Zephyr Boots)
  const [cardName, setCardName] = useState()

  async function searchCards(
    cardColorBlack,
    cardColorGreen,
    cardColorRed,
    cardColorBlue,
    cardColorWhite,
    e
  ) {
    e.preventDefault()

    let cardColorStringFunction = function (
      cardColorBlack,
      cardColorGreen,
      cardColorRed,
      cardColorBlue,
      cardColorWhite
    ) {
      let cardColor = []
      if (cardColorBlack) {
        cardColor.push('B')
      }
      if (cardColorGreen) {
        cardColor.push('G')
      }
      if (cardColorRed) {
        cardColor.push('R')
      }
      if (cardColorBlue) {
        cardColor.push('U')
      }
      if (cardColorWhite) {
        cardColor.push('W')
      }

      return cardColor
    }

    let cardColor = cardColorStringFunction(
      cardColorBlack,
      cardColorGreen,
      cardColorRed,
      cardColorBlue,
      cardColorWhite
    )

    cardColor = cardColor.join('')

    try {
      let cardFetchString = `http://localhost:5000/cards?format=${cardLegality}&colors=${cardColor}&cmc=${cardCMC}&name=${cardName}`
      if (cardCMC !== '') {
        cardFetchString = cardFetchString + `&cmc=${cardCMC}`
      }
      if (cardRestricted === true) {
        cardFetchString = cardFetchString + `&restricted=true`
      }
      let cards = await axios.get(cardFetchString)
      getCards(cards)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <form
        onSubmit={(e) =>
          searchCards(
            cardColorBlack,
            cardColorGreen,
            cardColorRed,
            cardColorBlue,
            cardColorWhite,
            e
          )
        }>
        <input
          type='text'
          placeholder='legal In'
          onChange={(e) => {
            setCardLegality(e.target.value)
          }}
          value={cardLegality}
        />

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
            onChange={() => {
              setCardColorBlack(!cardColorBlack)
            }}></input>
          <input
            type='checkbox'
            id='color-green'
            name='color'
            onChange={() => {
              setCardColorGreen(!cardColorGreen)
            }}></input>
          <input
            type='checkbox'
            id='color-red'
            name='color'
            onChange={() => {
              setCardColorRed(!cardColorRed)
            }}></input>
          <input
            type='checkbox'
            id='color-blue'
            name='color'
            onChange={() => {
              setCardColorBlue(!cardColorBlue)
            }}></input>
          <input
            type='checkbox'
            id='color-white'
            name='color'
            onChange={() => {
              setCardColorWhite(!cardColorWhite)
            }}></input>
        </div>
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
        <button type='submit'>Search Cards</button>
      </form>
    </div>
  )
}

export default CardForm
