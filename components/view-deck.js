import React from 'react'
import { connect } from 'react-redux'
import { View, Button } from 'react-native'
import { Card } from 'react-native-elements'
import Heading from './app-bar'
import CardList from './list-cards'
import { loadDeck } from '../actions'

class ViewDeck extends React.Component {

  componentDidMount () {
    const { deck } = this.props
    if (!deck) {
      this.props.loadDeck(this.props.navigation.state.params.id)
    }
  }

  render () {
    return (
      <View style={{flex: 1}}>
        <Heading title={(this.props.deck && this.props.deck.name) || 'Loading...'} navigation={this.props.navigation} />
        <Card style={{ backgroundColor: '#fff' }}>
          <Button
            backgroundColor='#03A9F4'
            buttonStyle={{borderRadius: 0, margin: 1}}
            title='New Card'
            onPress={() => {
              // let id = this.save(this.state)
              const {deck} = this.props
              this.props.navigation.navigate('NewCard', {deckId: deck.id})
            }} />
          <Button
            backgroundColor='#03A9F4'
            buttonStyle={{borderRadius: 0, margin: 1}}
            title='Take a Quiz'
            onPress={() => {
              // let id = this.save(this.state)
              const {deck} = this.props
              this.props.navigation.navigate('Quiz', {deckId: deck.id})
            }} />
          <CardList cards={(this.props.deck && this.props.deck.cards) || []} navigation={this.props.navigation} />
        </Card>
      </View>
    )
  }
}

function mapStateToProps ({ deck }) {
  return { deck }
}

function mapDispatchToProps (dispatch) {
  return {
    loadDeck: data => dispatch(loadDeck(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewDeck)
