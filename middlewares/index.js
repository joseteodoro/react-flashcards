import * as types from '../actions/action-types'
import { AsyncStorage } from 'react-native'

function addUpdateDeck (deck, next, action, card, deckId) {
  AsyncStorage.getItem('DECKS')
    .then((decks) => {
      const loadedDecks = ((decks && JSON.parse(decks)) || [])
      let targetDeck = null
      if (card) {
        targetDeck = loadedDecks.find((item) => item.id === deckId)
        targetDeck.cards = targetDeck.cards.concat(card)
      } else {
        targetDeck = deck
      }
      const toUpdate = loadedDecks
        .filter((item) => item.id !== targetDeck.id)
        .concat(targetDeck)
        .sort((left, right) => left.name > right.name)

      AsyncStorage.setItem('DECKS', JSON.stringify(toUpdate))
      .then((_) => {
        next(action)
      })
    })
}

export default function decks () {
  return (next) => (action) => {
    switch (action.type) {
      case types.HOME: {
        AsyncStorage.getItem('DECKS')
          .then((decks) => {
            action.decks = (decks && JSON.parse(decks)) || []
            next(action)
          })
        break
      }

      case types.ADD_CARD: {
        const { card, deckId } = action
        addUpdateDeck(null, next, action, card, deckId)
        break
      }

      case types.ADD_DECK: {
        const { deck } = action
        addUpdateDeck(deck, next, action)
        break
      }

      // case types.UPDATE_DECK: {
      //   const deck = loadDeck(action, true)
      //   action.deck = Object.assign(deck, action.deck)
      //   updateDeck(action.deck)
      //   return next(action)
      // }
      //
      // case types.UPDATE_CARD: {
      //   action.deck = loadDeck(action, true)
      //   const { card, deck } = {action}
      //   deck.cards.push(card)
      //   updateDeck(deck)
      //   return next(action)
      // }

      default : {
        next(action)
      }
    }
  }
}
