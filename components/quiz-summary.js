import React from 'react'
import { Button, Card } from 'react-native-elements'
import { Text } from 'react-native'
import FadeInView from './fade-in-view'

function getMessage (hits, questionsCount) {
  const res = (hits / questionsCount) * 100
  if (res < 25) {
    return `We need to study more. We got only ${res}% of correct answers. :(`
  }
  if (res < 60) {
    return `Could be worse. We got ${res}% of correct answers.`
  }
  if (res < 90) {
    return `Good job! We got ${res}% of correct answers. :D`
  }
  return `Superb! We got ${res}% of correct answers. XD`
}

const QuizSummary = ({styles, deckId, hits, questionsCount, navigation}) => (
  <FadeInView style={{flex: 1}}>
    <Card style={{ backgroundColor: '#fff' }}>
      <Text style={styles.content}>{getMessage(hits, questionsCount)}</Text>
      <Button
        backgroundColor='#03A9F4'
        buttonStyle={{borderRadius: 0, margin: 1}}
        title='Back to Deck'
        onPress={() => navigation.navigate('ViewDeck', {id: deckId})} />
      <Button
        backgroundColor='#03A9F4'
        buttonStyle={{borderRadius: 0, margin: 1}}
        title='Restart Quiz'
        onPress={() => navigation.navigate('Quiz', {deckId: deckId})} />
    </Card>
  </FadeInView>
)

export default QuizSummary
