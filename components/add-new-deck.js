import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TextInput } from 'react-native'
import { Card, Button } from 'react-native-elements'
import randomstring from 'randomstring'
import Heading from './app-bar'
import { addDeck } from '../actions'

let defaultState = {
  id: null,
  name: '',
  icon: 'flight-takeoff',
  cards: []
}

class NewDeck extends Component {

  constructor (props) {
    super(props)
    this.state = defaultState
  }

  save (state) {
    const id = randomstring.generate()
    this.props.addNewDeck({...this.state, id})
    this.setState(defaultState)
    return id
  }

  cancel () {
    this.setState(defaultState)
  }

  render () {
    return (
      <View style={{flex: 1}}>
        <Heading title='New Deck' navigation={this.props.navigation} />
        <Card style={{ backgroundColor: '#fff' }}>
          <Text style={{marginBottom: 10, textAlign: 'center'}}>Deck title</Text>
          <TextInput {...this.props} editable maxLength={20} onChangeText={(text) => this.setState({name: text})} value={this.state.name} />
          <Button
            backgroundColor='#03A9F4'
            buttonStyle={{borderRadius: 0, margin: 1}}
            title='Save'
            onPress={() => {
              let id = this.save(this.state)
              this.props.navigation.navigate('ViewDeck', {id})
            }} />
          <Button
            backgroundColor='#03A9F4'
            buttonStyle={{borderRadius: 0, margin: 1}}
            title='Cancel'
            onPress={() => {
              this.cancel()
              this.props.navigation.navigate('Home')
            }
            } />
        </Card>
      </View>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addNewDeck: data => dispatch(addDeck(data))
  }
}

export default connect(null, mapDispatchToProps)(NewDeck)
