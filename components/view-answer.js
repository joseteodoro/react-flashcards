import React from 'react'
import { Button, Card } from 'react-native-elements'
import { Text } from 'react-native'
import FadeInView from './fade-in-view'

const ViewAnswer = ({styles, card, buttonActionCorrect, buttonActionIncorrect}) => (
  <FadeInView>
    <Card style={{flex: 1, backgroundColor: '#fff'}}>
      <Text style={styles.content}>{card.answer}</Text>
    </Card>
    <Button
      backgroundColor='#1f7059'
      buttonStyle={{borderRadius: 0, margin: 5}}
      title='Correct'
      onPress={buttonActionCorrect} />
    <Button
      backgroundColor='#c4252d'
      buttonStyle={{borderRadius: 0, margin: 5}}
      title='Incorrect'
      onPress={buttonActionIncorrect} />
  </FadeInView>
)

export default ViewAnswer
