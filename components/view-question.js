import React from 'react'
import { Button, Card } from 'react-native-elements'
import { View, Text } from 'react-native'

const ViewQuestion = ({styles, card, buttonFunction}) => (
  <View>
    <Card style={{flex: 1, backgroundColor: '#fff'}}>
      <Text style={styles.content}>{`Answer: ${card.question}`}</Text>
    </Card>
    <Button
      backgroundColor='#1f7059'
      buttonStyle={{borderRadius: 0, margin: 1}}
      title='See Answer'
      onPress={buttonFunction} />
  </View>
)

export default ViewQuestion
