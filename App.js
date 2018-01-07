import React from 'react'
import { StackNavigator } from 'react-navigation'
import Home from './components/home'

const navigationOptions = {
  initialRouteName: 'Home'
}

const Stack = StackNavigator({
  Home: {
    screen: Home
  }
}, navigationOptions)

export default class App extends React.Component {
  render () {
    return (
      <Stack />
    )
  }
}
