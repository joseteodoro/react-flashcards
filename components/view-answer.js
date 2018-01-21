import React from 'react'
import { Button, Card } from 'react-native-elements'
import { View, Text } from 'react-native'

const ViewAnswer = ({styles, card, buttonActionCorrect, buttonActionIncorrect}) => (
  <View>
    <Card style={{flex: 1, backgroundColor: '#fff'}}>
      <Text style={styles.content}>{`Answer: ${card.answer}`}</Text>
    </Card>
    <Button
      backgroundColor='#1f7059'
      buttonStyle={{borderRadius: 0, margin: 1}}
      title='Correct'
      onPress={buttonActionCorrect} />
    <Button
      backgroundColor='#c4252d'
      buttonStyle={{borderRadius: 0, margin: 1}}
      title='Incorrect'
      onPress={buttonActionIncorrect} />
  </View>
)

export default ViewAnswer
