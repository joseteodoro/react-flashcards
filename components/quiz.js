import React from 'react'
import { View, Text } from 'react-native'
import { Card } from 'react-native-elements'
import Heading from './app-bar'

const Quiz = ({navigation}) => (
  <View style={{flex: 1}}>
    <Heading title='Quiz' navigation={navigation} />
    <Card style={{ backgroundColor: '#fff' }}>
      <Text style={{marginBottom: 10, textAlign: 'center'}}>Quiz</Text>
    </Card>
  </View>
)

export default Quiz
