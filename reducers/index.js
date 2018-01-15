import * as types from '../actions/action-types'

export default function decks (state = {decks: []}, action) {
  switch (action.type) {
    case types.HOME: {
      const {decks, card, deck} = action
      return {...state, decks, deck, card}
    }

    case types.LOAD_DECK: {
      const {deck} = action
      return {...state, deck}
    }

    case types.LOAD_CARD: {
      const { card } = {action}
      return {...state, card}
    }

    case types.UPDATE_DECK:
    case types.ADD_DECK:
    case types.ADD_CARD:
    case types.UPDATE_CARD: {
      const { deck } = {action}
      const decks = state.decks
      decks[deck.id] = deck
      return {...state, decks}
    }

    default :
      return state
  }
}
