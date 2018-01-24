import React from 'react'
import { StackNavigator } from 'react-navigation'
import { Provider } from 'react-redux'
import { View } from 'react-native'
import Home from './components/home'
import NewDeck from './components/add-new-deck'
import NewCard from './components/add-new-card'
import ViewDeck from './components/view-deck'
import Quiz from './components/quiz'
import configureStore from './configureStore'
import ViewConfig from './components/view-config'

const navigationOptions = {
  initialRouteName: 'Home'
}

const Stack = StackNavigator({
  Home: {
    screen: Home
  },
  NewDeck: {
    screen: NewDeck
  },
  ViewDeck: {
    path: 'deck/:id',
    screen: ViewDeck
  },
  NewCard: {
    path: 'NewCard/:id',
    screen: NewCard
  },
  Quiz: {
    path: 'quiz/:id',
    screen: Quiz
  },
  ViewConfig: {
    screen: ViewConfig
  }
}, navigationOptions)

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
