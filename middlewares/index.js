import * as types from '../action-types'
import { AsyncStorage } from 'react-native'

function loadDeck (action, forceReload) {
  const { deck, deckId } = {action}
  if (deck && !forceReload) {
    return deck
  }
  AsyncStorage.getItem('DECKS')
  .then((decks) => {
    return JSON.parse(decks)[deckId]
  })
}

function updateDeck (deck) {
  AsyncStorage.getItem('DECKS')
  .then((decks) => {
    decks[deck.id] = deck
    AsyncStorage.setItem('DECKS', JSON.stringify(decks))
  })
}

export default function decks () {
  return (next) => (action) => {
    switch (action.type) {
      case types.HOME: {
        AsyncStorage.getItem('DECKS')
          .then((decks) => {
            action.decks = JSON.parse(decks)
            return next(action)
          })
          .catch((error) => {
            console.log('AsyncStorage save error: ' + error.message)
          })
        break
      }

      case types.ADD_DECK: {
        const { deck } = {action}
        AsyncStorage.getItem('DECKS')
        .then((decks) => {
          const toUpdate = JSON.parse(decks)
          toUpdate[deck.id] = deck
          return AsyncStorage.setItem('DECKS', JSON.stringify(toUpdate))
        })
        .then((_) => {
          return next(action)
        })
        break
      }

      case types.LOAD_DECK: {
        action.deck = loadDeck(action, true)
        return next(action)
      }

      case types.LOAD_CARD: {
        const { cardId } = {action}
        action.deck = loadDeck(action)
        action.card = action.deck.cards.find((item) => item.id === cardId)
        return next(action)
      }

      case types.ADD_CARD: {
        action.deck = loadDeck(action, true)
        const { card, deck } = {action}
        deck.cards.push(card)
        updateDeck(deck)
        return next(action)
      }

      case types.UPDATE_DECK: {
        const deck = loadDeck(action, true)
        action.deck = Object.assign(deck, action.deck)
        updateDeck(action.deck)
        return next(action)
      }

      case types.UPDATE_CARD: {
        action.deck = loadDeck(action, true)
        const { card, deck } = {action}
        deck.cards.push(card)
        updateDeck(deck)
        return next(action)
      }

      default :
        return next(action)
    }
  }
}
