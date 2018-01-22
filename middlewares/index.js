import * as types from '../actions/action-types'
import { AsyncStorage } from 'react-native'
import updateLocaNotifications from '../notificationUtil'

const defaultConfigurationState = {
  notifications: false,
  quizSize: 5,
  notificationTime: '12:00'
}

function addUpdateDeck (deck, next, action, card, deckId) {
  AsyncStorage.getItem('DECKS')
    .then((decks) => {
      const loadedDecks = ((decks && JSON.parse(decks)) || [])
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

      AsyncStorage.setItem('DECKS', JSON.stringify(toUpdate))
      .then((_) => {
        AsyncStorage.getItem('ViewConfig')
          .then((viewConfig) => {
            const loadedConfig = ((viewConfig && JSON.parse(viewConfig)) || defaultConfigurationState)
            const {quizSize} = loadedConfig
            action.quizSize = quizSize
            next(action)
          })
      })
    })
}

export default function decks () {
  return (next) => (action) => {
    switch (action.type) {
      case types.START_QUIZ: {
        AsyncStorage.getItem('ViewConfig')
          .then((viewConfig) => {
            const loadedConfig = ((viewConfig && JSON.parse(viewConfig)) || defaultConfigurationState)
            updateLocaNotifications(loadedConfig)
            next(action)
          })
        break
      }

      case types.HOME: {
        AsyncStorage.getItem('DECKS')
          .then((decks) => {
            action.decks = (decks && JSON.parse(decks)) || []
            next(action)
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
