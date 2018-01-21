import * as types from '../actions/action-types'

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}

function randomCards(cards, randomCount) {
  const sampleSize = Math.min(randomCount, cards.length)
  const set = new Set([])
  while (set.size < sampleSize) {
    set.add(cards[getRandomInt(cards.length)])
  }
  return [...set]
}

export default function decks (state = {decks: []}, action) {
  // const inspect = require('util-inspect')
  // console.log('reducer ##########', inspect(action))
  switch (action.type) {
    case types.START_QUIZ: {
      const deck = state.decks.find((item) => item.id === action.deckId)
      if (deck) {
        const quizCards = randomCards(deck.cards, 5)
        const quiz = {
          cards: quizCards,
          size: quizCards.length,
          deckName: deck.name
        }
        return {...state, quiz}
      }
      return state
    }

    // case types.FINISH_QUIZ: {
    //   const deck = state.decks.find((item) => item.id === action.deckId)
    //   let cards = []
    //   if (deck) {
    //     cards = deck.cards
    //   }
    //   return {...state, deck, cards}
    // }

    case types.HOME: {
      const noReloadFromStore = (state.decks && state.decks.length)
      if (noReloadFromStore) {
        return state
      }
      const { decks } = action
      return {...state, decks}
    }

    case types.LOAD_DECK: {
      const deck = state.decks.find((item) => item.id === action.deckId)
      let cards = []
      if (deck) {
        cards = deck.cards
      }
      return {...state, deck, cards}
    }

    // case types.LOAD_CARD: {
    //   const { deckId, cardId } = action
    //   const deck = state.decks.find((item) => item.id === deckId)
    //   const card = deck.cards.find((item) => item.id === cardId)
    //   return {...state, deck, card}
    // }

    case types.ADD_CARD: {
      const { card, deckId } = action
      const deck = state.decks.find((item) => item.id === deckId)
      deck.cards = deck.cards.concat(card)
      const decks = state.decks.map((item) => {
        if (item.id === deckId) {
          return deck
        }
        return item
      })
      const { cards } = deck
      return {...state, decks, cards}
    }

    case types.ADD_DECK: {
      const { deck } = action
      const decks = state.decks
        .filter((item) => item.id !== deck.id)
        .concat(deck)
        .sort((l, r) => l.name > r.name)
      return {...state, decks, deck, cards: []}
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
