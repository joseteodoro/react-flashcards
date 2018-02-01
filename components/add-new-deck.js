import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, TextInput } from 'react-native'
import { Card, Button } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'
import randomstring from 'random-string'
import FadeInView from './fade-in-view'
import Heading from './app-bar'
import { addDeck } from '../actions'
import styles from './style'

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
      <FadeInView style={{flex: 1}}>
        <Heading title='New Deck' navigation={navigation} />
        <Card style={styles.card}>
          <Text style={styles.content}>What is the title of our new deck?</Text>
          <TextInput {...this.props} editable maxLength={20} onChangeText={(text) => this.setState({name: text})} value={this.state.name} />
          <Button
            backgroundColor='#03A9F4'
            buttonStyle={styles.buttonStyle}
            title='Create Deck'
            onPress={() => {
              let id = this.save(this.state)
              navigation.navigate('ViewDeck', {id})
            }} />
          <Button
            backgroundColor='#03A9F4'
            buttonStyle={styles.buttonStyle}
            title='Cancel'
            onPress={() => {
              this.cancel()
              navigation.dispatch(NavigationActions.back())
            }
            } />
        </Card>
      </FadeInView>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addNewDeck: data => dispatch(addDeck(data))
  }
}

export default connect(null, mapDispatchToProps)(NewDeck)
