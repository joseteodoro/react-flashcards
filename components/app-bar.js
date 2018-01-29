import React from 'react'
import { Header } from 'react-native-elements'
import { FontAwesome } from '@expo/vector-icons'
import { NavigationActions } from 'react-navigation'

function reset (navigation) {
  return navigation
  .dispatch(NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({routeName: 'Home'})
    ]}))
}

const Heading = ({title, navigation}) => <Header
  leftComponent={<FontAwesome name='cog'
    type='font-awesome' size={30} color='#fff' onPress={() => navigation.navigate('ViewConfig')} />
  }
  centerComponent={{ text: title, style: { color: '#fff', fontSize: 24 } }}
  rightComponent={<FontAwesome name='home'
    type='font-awesome' size={30} color='#fff' onPress={() => reset(navigation)} />
  } />

export default Heading
