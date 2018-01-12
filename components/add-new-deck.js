import React, { Component } from 'react'
import { View, Text, TextInput } from 'react-native'
import { Card, Button } from 'react-native-elements'
import Heading from './app-bar'

let defaultState = {
  id: null,
  title: '',
  icon: 'flight-takeoff',
  questions: []
}

class NewDeck extends Component {

  constructor ({props}) {
    super(props)
    this.state = defaultState
  }

  save (state) {
    let { id } = this.state
    this.saveNewDeck(this.state)
    this.setState(defaultState)
    return id
  }

  cancel () {
    this.setState(defaultState)
  }

  render () {
    const {navigation} = this.props
    return (
      <View style={{flex: 1}}>
        <Heading title='New Deck' navigation={navigation} />
        <Card style={{ backgroundColor: '#fff' }}>
          <Text style={{marginBottom: 10, textAlign: 'center'}}>Deck title</Text>
          <TextInput {...this.props} editable maxLength={20} onChangeText={(text) => this.setState({title: text})} value={this.state.title} />
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
              this.cancel()
              navigation.navigate('Home')
            }
            } />
        </Card>
      </View>
    )
  }
}

export default NewDeck
