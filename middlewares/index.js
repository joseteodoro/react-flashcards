import * as types from '../actions/action-types'
import { AsyncStorage } from 'react-native'

export default function decks ({getState}) {
  var inspect = require('util-inspect')
  console.log('middleware getState', inspect(getState()))

  return (next) => (action) => {
    switch (action.type) {
      case types.HOME: {
        AsyncStorage.getItem('DECKS')
          .then((decks) => {
            action.decks = ((decks && JSON.parse(decks)) || [])
            return next(action)
          })
        break
      }

      case types.ADD_CARD: {
        const decks = getState().decks
        const { card, deckId } = action
        const toUpdate = decks.map((item) => {
          if (item.id === deckId) {
            let updatedDeck = {...item}
            updatedDeck.cards = updatedDeck.cards.concat(card)
            return updatedDeck
          }
          return item
        })
        AsyncStorage.setItem('DECKS', JSON.stringify(toUpdate))
        .then((_) => {
          next(action)
        })
        break
      }

      case types.ADD_DECK: {
        const decks = getState().decks
        const { deck } = action
        const toUpdate = decks
          .filter((item) => item.id !== deck.id)
          .concat(deck)
          .sort((left, right) => left.name > right.name)

        AsyncStorage.setItem('DECKS', JSON.stringify(toUpdate))
        .then((_) => {
          return next(action)
        })
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

      default :
        return next(action)
    }
  }
}
