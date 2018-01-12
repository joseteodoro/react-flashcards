import React, { Component } from 'react'
import { View, Text, TextInput } from 'react-native'
import { Card, Button } from 'react-native-elements'
import Heading from './app-bar'

let defaultState = {
  id: null,
  question: '',
  answer: ''
}

class NewCard extends Component {

  constructor ({props}) {
    super(props)
    // const {deck} = props
    this.state = defaultState
    // this.state.deck = deck
  }

  save (state) {
    this.saveNewCard(this.state)
    this.setState(defaultState)
  }

  cancel () {
    this.setState(defaultState)
  }

  render () {
    const {navigation} = this.props
    // const {deck} = this.state
    return (
      <View style={{flex: 1}}>
        <Heading title='New Card' navigation={navigation} />
        <Card style={{ backgroundColor: '#fff' }}>
          <Text style={{marginBottom: 10, textAlign: 'center'}}>Question</Text>
          <TextInput {...this.props} editable maxLength={50} onChangeText={(text) => this.setState({question: text})} value={this.state.question} />
          <Text style={{marginBottom: 10, textAlign: 'center'}}>Answer</Text>
          <TextInput {...this.props} editable maxLength={50} onChangeText={(text) => this.setState({answer: text})} value={this.state.answer} />
          <Button
            backgroundColor='#03A9F4'
            buttonStyle={{borderRadius: 0, margin: 1}}
            title='Save'
            onPress={() => {
              let id = this.save(this.state)
              navigation.navigate('ViewDeck', {id})
            }} />
          <Button
            backgroundColor='#03A9F4'
            buttonStyle={{borderRadius: 0, margin: 1}}
            title='Cancel'
            onPress={() => {
              const id = 1
              this.cancel()
              navigation.navigate('ViewDeck', {id})
            }
            } />
        </Card>
      </View>
    )
  }
}

export default NewCard
