import React from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'
import { Card, Button } from 'react-native-elements'
import Heading from './app-bar'
import DeckList from './list-deck'
import { home } from '../actions'
import FadeInView from './fade-in-view'
import styles from './style'
// var inspect = require('util-inspect')

class Home extends React.Component {

  componentDidMount () {
    // if (!(this.props.decks && this.props.decks.length)) {
    this.props.getDecks()
    // }
  }

  render () {
    return (
      <FadeInView>
        <Heading title='Flash Cards' navigation={this.props.navigation} />
        <View>
          <Card style={styles.card}>
            <Text style={styles.content}>Add a new deck</Text>
            <Button
              backgroundColor='#03A9F4'
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
              title='Add a new Deck'
              onPress={() => this.props.navigation.navigate('NewDeck')} />
          </Card>
          { this.props.decks && this.props.decks.length ? (
            <DeckList items={this.props.decks} navigation={this.props.navigation} />
          ) : (
            <DeckList items={[]} navigation={this.props.navigation} />
          )}
        </View>
      </FadeInView>
    )
  }
}

function mapStateToProps ({decks}) {
  return { decks }
}

function mapDispatchToProps (dispatch) {
  return {
    getDecks: data => dispatch(home(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
