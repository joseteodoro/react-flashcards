import * as types from '../actions/action-types'
import updateLocaNotifications from '../notificationUtil'
import {saveDecks, loadDecks, loadConfiguration} from '../storeUtils'

function addUpdateDeck (deck, next, action, card, deckId) {
  loadDecks((loadedDecks) => {
    let targetDeck = null
    if (card) {
      targetDeck = loadedDecks.find((item) => item.id === deckId)
      targetDeck.cards = targetDeck.cards.concat(card)
    } else {
      targetDeck = deck
    }
    const toUpdate = loadedDecks
      .filter((item) => item.id !== targetDeck.id)
      .concat(targetDeck)
      .sort((left, right) => left.name > right.name)

    saveDecks(toUpdate, () => {
      next(action)
    })
  })
}

export default function decks () {
  return (next) => (action) => {
    switch (action.type) {
      case types.START_QUIZ: {
        loadConfiguration((loadedConfig) => {
          updateLocaNotifications(loadedConfig)
          Object.assign(action, loadedConfig)
          next(action)
        })
        break
      }

      case types.HOME: {
        loadDecks((decks) => {
          action.decks = decks
          loadConfiguration((loadedConfig) => {
            Object.assign(action, loadedConfig)
            next(action)
          })
        })
        break
      }

      case types.ADD_CARD: {
        const { card, deckId } = action
        addUpdateDeck(null, next, action, card, deckId)
        break
      }

      case types.ADD_DECK: {
        const { deck } = action
        addUpdateDeck(deck, next, action)
        break
      }

      default : {
        next(action)
      }
    }
  }
}
