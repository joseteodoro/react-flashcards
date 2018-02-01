import React, { Component } from 'react'
import { Text, TextInput } from 'react-native'
import { Card, Button } from 'react-native-elements'
import { connect } from 'react-redux'
import randomstring from 'random-string'
import { NavigationActions } from 'react-navigation'
import Heading from './app-bar'
import { loadDeck, addCard } from '../actions'
import FadeInView from './fade-in-view'
import styles from './style'

let defaultState = {
  id: null,
  question: '',
  answer: ''
}

class NewCard extends Component {

  constructor ({props}) {
    super(props)
    this.state = defaultState
  }

  componentDidMount () {
    const dontReload = (this.props.deck && this.props.deck.id && this.props.navigation.state.params.id === this.props.deck.id)
    if (!dontReload) {
      const deckId = this.props.navigation.state.params.id
      this.props.loadDeck({deckId})
    }
  }

  save (state) {
    const id = randomstring({length: 20})
    const card = {...this.state, id}
    const { deck } = this.props
    this.props.saveNewCard({card, deckId: deck.id})
    this.setState(defaultState)
  }

  cancel () {
    this.setState(defaultState)
  }

  render () {
    const {navigation} = this.props
    return (
      <FadeInView style={{flex: 1}}>
        { this.props.deck && this.props.deck.name ? (
          <Heading title={`New card on ${this.props.deck.name}`} navigation={navigation} />
        ) : (
          <Heading title='Loading...' navigation={navigation} />
        ) }
        <Card style={styles.card}>
          <Text style={styles.content}>Question</Text>
          <TextInput {...this.props} editable maxLength={50} onChangeText={(text) => this.setState({question: text})} value={this.state.question} />
          <Text style={styles.content}>Answer</Text>
          <TextInput {...this.props} editable maxLength={50} onChangeText={(text) => this.setState({answer: text})} value={this.state.answer} />
          <Button
            backgroundColor='#03A9F4'
            buttonStyle={styles.buttonStyle}
            title='Save'
            onPress={() => {
              this.save(this.state)
              navigation.dispatch(NavigationActions.back())
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

function mapStateToProps ({ deck }) {
  return { deck }
}

function mapDispatchToProps (dispatch) {
  return {
    loadDeck: data => dispatch(loadDeck(data)),
    saveNewCard: data => dispatch(addCard(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCard)
