import React from 'react'
import { Button, Card } from 'react-native-elements'
import { Text } from 'react-native'
import FadeInView from './fade-in-view'

const ViewQuestion = ({styles, card, buttonFunction}) => (
  <FadeInView>
    <Card style={{flex: 1, backgroundColor: '#fff'}}>
      <Text style={styles.content}>{card.question}</Text>
    </Card>
    <Button
      backgroundColor='#03A9F4'
      buttonStyle={{borderRadius: 0, margin: 1}}
      title='Show Answer'
      onPress={buttonFunction} />
  </FadeInView>
)

export default ViewQuestion
