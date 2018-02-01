import { StackNavigator } from 'react-navigation'
import Home from './components/home'
import NewDeck from './components/add-new-deck'
import NewCard from './components/add-new-card'
import ViewDeck from './components/view-deck'
import Quiz from './components/quiz'
import ViewConfig from './components/view-config'

const navigationOptions = {
  initialRouteName: 'Home'
}

export default StackNavigator({
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
