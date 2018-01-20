import * as types from '../actions/action-types'

export default function decks (state = {decks: []}, action) {
  // const inspect = require('util-inspect')
  // console.log('reducer ##########', inspect(action))
  switch (action.type) {
    case types.HOME: {
      if (!(state.decks && state.decks.length)) {
        const {decks} = action
        return {...state, decks}
      }
      return state
    }

    case types.LOAD_DECK: {
      const inspect = require('util-inspect')
      console.log('loading deck ##########', inspect(action))
      const deck = state.decks.find((item) => item.id === action.deckId)
      return {...state, deck}
    }

    case types.LOAD_CARD: {
      const { deckId, cardId } = action
      const deck = state.decks.find((item) => item.id === deckId)
      const card = deck.cards.find((item) => item.id === cardId)
      return {...state, deck, card}
    }

    case types.ADD_CARD:
    case types.ADD_DECK: {
      const { decks, deck } = {action}
      return {...state, decks, deck}
    }

    // case types.UPDATE_DECK:
    // case types.UPDATE_CARD: {
    //   const { deck } = {action}
    //   const decks = state.decks.map((item) => {
    //     if (item.id === deck.id) {
    //       return deck
    //     }
    //     return item
    //   })
    //   decks[deck.id] = deck
    //   return {...state, decks}
    // }

    default : {
      return state
    }
  }
}
