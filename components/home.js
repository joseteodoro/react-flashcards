import React from 'react'
import { View, Text } from 'react-native'
import { Card, Button } from 'react-native-elements'
import Heading from './app-bar'
import DeckList from './list-deck'

const list = [
  {
    title: 'React',
    icon: 'av-timer'
  },
  {
    title: 'Redux and React Native',
    icon: 'flight-takeoff'
  },
  {
    title: 'C++',
    icon: 'no-encryption'
  }
]

const Home = ({navigation}) => (
  <View style={{flex: 1}}>
    <Heading title='Flash Cards' navigation={{ navigation }} />
    <Card style={{ backgroundColor: '#fff' }}>
      <Text style={{marginBottom: 10, textAlign: 'center'}}>Add a new deck to play some quizes</Text>
      <Button
        backgroundColor='#03A9F4'
        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
        title='New Deck'
        onPress={() => console.log('Calling new item')} />
    </Card>
    <DeckList items={list} />
  </View>
)

export default Home
