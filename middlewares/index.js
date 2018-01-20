import * as types from '../actions/action-types'
import { AsyncStorage } from 'react-native'
// var inspect = require('util-inspect')

function loadDeck (action) {
  const { deckId } = {action}
  return AsyncStorage.getItem('DECKS')
    .then((decks) => JSON.parse(decks).find((item) => item.id === deckId))
}

function updateDeck (deck) {
  AsyncStorage.getItem('DECKS')
  .then((decks) => {
    decks[deck.id] = deck
    AsyncStorage.setItem('DECKS', JSON.stringify(decks))
  })
}

export default function decks ({getState}) {
  return (next) => (action) => {
    switch (action.type) {
      case types.HOME: {
        AsyncStorage.getItem('DECKS')
          .then((decks) => {
            action.decks = JSON.parse(decks)
            return next(action)
          })
        break
      }

      case types.ADD_CARD:
      case types.ADD_DECK: {
        const { card, deck } = action
        if (card) {
          deck.cards = deck.cards.concat(card)
        }
        AsyncStorage.getItem('DECKS')
        .then((decks) => {
          const toUpdate = ((decks && JSON.parse(decks)) || [])
            .filter((item) => item.id !== deck.id)
            .concat(deck)
            .sort((left, right) => left.id > right.id)
          action.decks = toUpdate
          return AsyncStorage.setItem('DECKS', JSON.stringify(toUpdate))
        })
        .then((_) => {
          return next(action)
        })
        break
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
