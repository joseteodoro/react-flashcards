import * as types from './action-types'

export const loadDeck = (deckId) => {
  return {
    type: types.LOAD_DECK,
    deckId
  }
}

export const loadCard = (cardId, deckId, deck) => {
  return {
    type: types.LOAD_CARD,
    deckId,
    cardId,
    deck,
    card: null
  }
}

export const addDeck = ({name, id}) => {
  return {
    type: types.ADD_DECK,
    deck: {id, name, cards: []}
  }
}

export const updateDeck = (id, name) => {
  return {
    type: types.UPDATE_DECK,
    deck: {id, name}
  }
}

export const addCard = (deck, {id, question, answer, deckId}) => {
  return {
    type: types.ADD_CARD,
    deckId,
    deck,
    card: {id, question, answer}
  }
}

export const updateCard = (id, question, answer, deckId, deck) => {
  return {
    type: types.UPDATE_CARD,
    deckId,
    deck,
    card: {id, question, answer}
  }
}

export const home = () => {
  return {
    type: types.HOME,
    decks: [],
    deck: null,
    card: null
  }
}
