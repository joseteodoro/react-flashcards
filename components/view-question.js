import React from 'react'
import { Button, Card } from 'react-native-elements'
import { Text } from 'react-native'
import FadeInView from './fade-in-view'
import styles from './style'

const ViewQuestion = ({card, buttonFunction}) => (
  <FadeInView>
    <Card style={styles.card}>
      <Text style={styles.content}>{card.question}</Text>
    </Card>
    <Button
      backgroundColor='#03A9F4'
      buttonStyle={styles.buttonStyle}
      title='Show Answer'
      onPress={buttonFunction} />
  </FadeInView>
)

export default ViewQuestion
