import React from 'react'
import { Button, Card } from 'react-native-elements'
import { Text } from 'react-native'
import FadeInView from './fade-in-view'
import styles from './style'

const ViewAnswer = ({card, buttonActionCorrect, buttonActionIncorrect}) => (
  <FadeInView>
    <Card style={styles.card}>
      <Text style={styles.content}>{card.answer}</Text>
    </Card>
    <Button
      backgroundColor='#1f7059'
      buttonStyle={styles.buttonStyle}
      title='Correct'
      onPress={buttonActionCorrect} />
    <Button
      backgroundColor='#c4252d'
      buttonStyle={styles.buttonStyle}
      title='Incorrect'
      onPress={buttonActionIncorrect} />
  </FadeInView>
)

export default ViewAnswer
