import * as types from './action-types'

export const updateQuizSize = ({quizSize}) => {
  return {
    type: types.UPDATE_QUIZ_SIZE,
    quizSize
  }
}

export const loadDeck = ({deckId}) => {
  return {
    type: types.LOAD_DECK,
    deckId
  }
}

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

export const home = () => {
  return {
    type: types.HOME
  }
}
