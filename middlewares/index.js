import * as types from '../actions/action-types'
import { AsyncStorage } from 'react-native'

export default function decks ({getState}) {
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
        const { card, deckId } = action
        AsyncStorage.getItem('DECKS')
        .then((decks) => {
          const toUpdate = ((decks && JSON.parse(decks)) || [])
            .map((item) => {
              if (item.id === deckId) {
                let updatedDeck = {...item}
                updatedDeck.cards = updatedDeck.cards.concat(card)
                action.deck = updatedDeck
                return updatedDeck
              }
              return item
            })
          action.decks = toUpdate
          return AsyncStorage.setItem('DECKS', JSON.stringify(toUpdate))
        })
        .then((_) => {
          return next(action)
        })
        break
      }

      case types.ADD_DECK: {
        const { deck } = action
        AsyncStorage.getItem('DECKS')
        .then((decks) => {
          const toUpdate = ((decks && JSON.parse(decks)) || [])
            .filter((item) => item.id !== deck.id)
            .concat(deck)
            .sort((left, right) => left.name > right.name)
          action.decks = toUpdate
          AsyncStorage.setItem('DECKS', JSON.stringify(toUpdate))
          .then((_) => {
            var inspect = require('util-inspect')
            console.log('midlware after add deck returning the promisse, decks ##########', inspect(action))
            return next(action)
          })
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
