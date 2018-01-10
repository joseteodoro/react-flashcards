import React from 'react'
import { View, Text } from 'react-native'
import { Card, Button } from 'react-native-elements'
import Heading from './app-bar'
import DeckList from './list-deck'

const list = [
  {
    id: 'abc',
    title: 'React',
    icon: 'av-timer',
    questions: [
      {question: 'How react works?', answer: 'Works very fine :D'},
      {question: 'my other question', answer: 'my answer to the question'}
    ]
  },
  {
    id: 'xyz',
    title: 'Redux and React Native',
    icon: 'flight-takeoff',
    questions: [
      {question: 'How redux and react works?', answer: 'Works amazing'}
    ]
  },
  {
    id: 'hua',
    title: 'C++',
    icon: 'no-encryption',
    questions: [
      {question: 'How C++ works?', answer: 'Works very hard :D'}
    ]
  }
]

const Home = ({navigation}) => (
  <View style={{flex: 1}}>
    <Heading title='Flash Cards' navigation={navigation} />
    <Card style={{ backgroundColor: '#fff' }}>
      <Text style={{marginBottom: 10, textAlign: 'center'}}>Add a new deck to play some quizes</Text>
      <Button
        backgroundColor='#03A9F4'
        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
        title='New Deck'
        onPress={() => navigation.navigate('NewDeck')} />
    </Card>
    <DeckList items={list} navigation={navigation} />
  </View>
)

export default Home
