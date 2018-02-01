import React from 'react'
import { Provider } from 'react-redux'
import { View } from 'react-native'
import Stack from './navigator'
import configureStore from './configureStore'

const store = configureStore()

export default class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <Stack />
        </View>
      </Provider>
    )
  }
}
