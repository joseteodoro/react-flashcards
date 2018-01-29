import React from 'react'
import { connect } from 'react-redux'
import { Card, Button } from 'react-native-elements'
import Heading from './app-bar'
import CardList from './list-cards'
import FadeInView from './fade-in-view'
import { loadDeck } from '../actions'

class ViewDeck extends React.Component {

  componentDidMount () {
    const dontReload = (
      this.props.deck &&
      this.props.deck.id &&
      this.props.navigation.state.params.id === this.props.deck.id
    )
    if (!dontReload) {
      const deckId = this.props.navigation.state.params.id
      this.props.loadDeck({deckId})
    }
  }

  render () {
    return (
      <FadeInView style={{flex: 1}}>
        { this.props.deck && this.props.deck.name ? (
          <Heading title={`${this.props.deck.name} with ${this.props.deck.cards.length} cards`} navigation={this.props.navigation} />
        ) : (
          <Heading title='Loading...' navigation={this.props.navigation} />
        ) }
        <Card style={{ backgroundColor: '#fff' }}>
          <Button
            backgroundColor='#03A9F4'
            buttonStyle={{borderRadius: 0, margin: 1}}
            title='Create New Question'
            onPress={() => {
              const {deck} = this.props
              this.props.navigation.navigate('NewCard', {id: deck.id})
            }} />
          <Button
            backgroundColor='#03A9F4'
            buttonStyle={{borderRadius: 0, margin: 1}}
            title='Start Quiz'
            disabled={!(this.props.deck && this.props.deck.cards.length)}
            onPress={() => {
              const {deck} = this.props
              this.props.navigation.navigate('Quiz', {deckId: deck.id})
            }} />
        </Card>
        { this.props.deck && this.props.deck.name ? (
          <CardList cards={this.props.deck.cards} navigation={this.props.navigation} />
        ) : (
          <CardList cards={[]} navigation={this.props.navigation} />
        ) }
      </FadeInView>
    )
  }
}

function mapStateToProps ({ deck, cards }) {
  return { deck, cards }
}

function mapDispatchToProps (dispatch) {
  return {
    loadDeck: data => dispatch(loadDeck(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewDeck)
