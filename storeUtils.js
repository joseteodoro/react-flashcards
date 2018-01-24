import { AsyncStorage } from 'react-native'

export const loadConfiguration = (cb) => {
  AsyncStorage.getItem('ViewConfig')
    .then((viewConfig) => {
      const loadedConfig = ((viewConfig && JSON.parse(viewConfig)))
      cb(loadedConfig)
    })
}

export const saveConfiguration = (configuration, cb) => {
  AsyncStorage.setItem('ViewConfig', JSON.stringify(configuration))
  .then((_) => {
    cb()
  })
}

export const loadDecks = (cb) => {
  AsyncStorage.getItem('DECKS')
    .then((decks) => {
      const loadedDecks = ((decks && JSON.parse(decks)) || [])
      cb(loadedDecks)
    })
}

export const saveDecks = (decks, cb) => {
  AsyncStorage.setItem('DECKS', JSON.stringify(decks))
  .then((_) => {
    cb()
  })
}
