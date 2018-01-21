import * as types from './action-types'
// const inspect = require('util-inspect')

export const loadDeck = ({deckId}) => {
  return {
    type: types.LOAD_DECK,
    deckId
  }
}

// export const loadCard = (cardId, deckId, deck) => {
//   return {
//     type: types.LOAD_CARD,
//     deckId,
//     cardId,
//     deck,
//     card: null
//   }
// }

export const startQuiz = ({deckId}) => {
  return {
    type: types.START_QUIZ,
    deckId
  }
}

export const finishQuiz = () => {
  return {
    type: types.FINISH_QUIZ
  }
}

export const addDeck = ({name, id}) => {
  return {
    type: types.ADD_DECK,
    deck: {id, name, cards: []}
  }
}

export const addCard = ({card, deckId}) => {
  return {
    type: types.ADD_CARD,
    card,
    deckId
  }
}

// export const updateDeck = (id, name) => {
//   return {
//     type: types.UPDATE_DECK,
//     deck: {id, name}
//   }
// }

// export const updateCard = (id, question, answer, deckId, deck) => {
//   return {
//     type: types.UPDATE_CARD,
//     deckId,
//     deck,
//     card: {id, question, answer}
//   }
// }

export const home = () => {
  return {
    type: types.HOME
  }
}
