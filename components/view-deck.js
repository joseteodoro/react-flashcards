import React from 'react'
import { connect } from 'react-redux'
import { View, Button } from 'react-native'
import { Card } from 'react-native-elements'
import Heading from './app-bar'
import CardList from './list-cards'
import { loadDeck } from '../actions'
var inspect = require('util-inspect')

class ViewDeck extends React.Component {

  componentDidMount () {
    this.props.loadDeck(this.props.navigation.state.params.id)
    console.log('view deck ##########', inspect(this.props.navigation.state.params))
  }

  render () {
    return (
      <View style={{flex: 1}}>
        { this.props.deck && this.props.deck.name ? (
          <Heading title={this.props.deck.name} navigation={this.props.navigation} />
        ) : (
          <Heading title='Loading...' navigation={this.props.navigation} />
        ) }
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
              // const {deck} = this.props
              // this.props.navigation.navigate('Quiz', {deckId: deck.id})
            }} />
          <CardList cards={[]} navigation={this.props.navigation} />
        </Card>
      </View>
    )
  }
}

function mapStateToProps ({ deck }) {
  console.log('view deck mapStateProps ##########', inspect(deck))
  return { deck }
}

function mapDispatchToProps (dispatch) {
  return {
    loadDeck: data => dispatch(loadDeck(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewDeck)
