import React, { Component } from 'react'
import { View, Text, TextInput } from 'react-native'
import { Card, Button } from 'react-native-elements'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import randomstring from 'random-string'
import Heading from './app-bar'
import { loadDeck, addCard } from '../actions'
// var inspect = require('util-inspect')

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

  componentDidMount () {
    this.props.loadDeck(this.props.navigation.state.params.deckId)
    // console.log('new card load deck ##########', inspect(this.props.navigation.state.params))
  }

  save (state) {
    // console.log('adding new card props ##########', inspect(this.props))
    const { deck } = this.props
    const id = randomstring({length: 20})
    const card = {...this.state, id}
    // console.log('adding new card ##########', inspect(card))
    // console.log('adding new card on deck ##########', inspect(deck))
    this.props.saveNewCard({deck, card})
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
        { this.props.deck && this.props.deck.name ? (
          <Heading title={`New card on ${this.props.deck.name}`} navigation={navigation} />
        ) : (
          <Heading title='Loading...' navigation={navigation} />
        ) }
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
              this.save(this.state)
              navigation.dispatch(NavigationActions.back())
            }} />
          <Button
            backgroundColor='#03A9F4'
            buttonStyle={{borderRadius: 0, margin: 1}}
            title='Cancel'
            onPress={() => {
              this.cancel()
              navigation.dispatch(NavigationActions.back())
            }
            } />
        </Card>
      </View>
    )
  }
}

function mapStateToProps ({ deck }) {
  // console.log('new card mapStateProps ##########', inspect(deck))
  return { deck }
}

function mapDispatchToProps (dispatch) {
  return {
    loadDeck: data => dispatch(loadDeck(data)),
    saveNewCard: data => dispatch(addCard(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCard)
