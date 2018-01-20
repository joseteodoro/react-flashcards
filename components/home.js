import React from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'
import { Card, Button } from 'react-native-elements'
import Heading from './app-bar'
import DeckList from './list-deck'
import { home } from '../actions'
// var inspect = require('util-inspect')

class Home extends React.Component {

  componentDidMount () {
    // if (!(this.props.decks && this.props.decks.length)) {
    this.props.getDecks()
    // }
  }

  render () {
    return (
      <View style={{flex: 1}}>
        <Heading title='Flash Cards' navigation={this.props.navigation} />
        <Card style={{ backgroundColor: '#fff' }}>
          <Text style={{marginBottom: 10, textAlign: 'center'}}>Add a new deck to play some quizes</Text>
          <Button
            backgroundColor='#03A9F4'
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='New Deck'
            onPress={() => this.props.navigation.navigate('NewDeck')} />
        </Card>
        { this.props.decks && this.props.decks.length ? (
          <DeckList items={this.props.decks} navigation={this.props.navigation} />
        ) : (
          <DeckList items={[]} navigation={this.props.navigation} />
        )}
      </View>
    )
  }
}

function mapStateToProps ({decks}) {
  var inspect = require('util-inspect')
  console.log('home after mapStateProps, decks ##########', inspect(decks))
  return { decks }
}

function mapDispatchToProps (dispatch) {
  return {
    getDecks: data => dispatch(home(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
