import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TextInput } from 'react-native'
import { Card, Button } from 'react-native-elements'
import randomstring from 'random-string'
import Heading from './app-bar'
import { addDeck } from '../actions'

let defaultState = {
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
    const id = randomstring({length: 20})
    this.props.addNewDeck({...this.state, id})
    this.setState(defaultState)
    return id
  }

  cancel () {
    this.setState(defaultState)
  }

  render () {
    const { navigation } = this.props
    return (
      <View style={{flex: 1}}>
        <Heading title='New Deck' navigation={navigation} />
        <Card style={{ backgroundColor: '#fff' }}>
          <Text style={{marginBottom: 10, textAlign: 'center'}}>Deck title</Text>
          <TextInput {...this.props} editable maxLength={20} onChangeText={(text) => this.setState({name: text})} value={this.state.name} />
          <Button
            backgroundColor='#03A9F4'
            buttonStyle={{borderRadius: 0, margin: 1}}
            title='Save'
            onPress={() => {
              this.save(this.state)
              // let id = this.save(this.state)
              // navigation.navigate('ViewDeck', {id})
              navigation.navigate('Home')
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

function mapDispatchToProps (dispatch) {
  return {
    addNewDeck: data => dispatch(addDeck(data))
  }
}

export default connect(null, mapDispatchToProps)(NewDeck)
