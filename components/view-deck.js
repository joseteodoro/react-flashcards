import React from 'react'
import { View, Button } from 'react-native'
import { Card } from 'react-native-elements'
import Heading from './app-bar'
import CardList from './list-cards'

const questions = [
  {question: 'How react works?', answer: 'Works very fine :D'},
  {question: 'my other question', answer: 'my answer to the question'}
]

const ViewDeck = ({navigation}) => (
  <View style={{flex: 1}}>
    <Heading title='View Deck' navigation={navigation} />
    <Card style={{ backgroundColor: '#fff' }}>
      <Button
        backgroundColor='#03A9F4'
        buttonStyle={{borderRadius: 0, margin: 1}}
        title='New Card'
        onPress={() => {
          // let id = this.save(this.state)
          let deck = {id: 1}
          navigation.navigate('NewCard', {deck})
        }} />
      <Button
        backgroundColor='#03A9F4'
        buttonStyle={{borderRadius: 0, margin: 1}}
        title='Take a Quiz'
        onPress={() => {
          // let id = this.save(this.state)
          let deck = {id: 1}
          navigation.navigate('Quiz', {deck})
        }} />
      <CardList cards={questions} navigation={navigation} />
    </Card>
  </View>
)

export default ViewDeck
