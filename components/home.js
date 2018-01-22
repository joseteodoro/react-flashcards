import React from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet } from 'react-native'
import { Card, Button } from 'react-native-elements'
import Heading from './app-bar'
import DeckList from './list-deck'
import { home } from '../actions'
import FadeInView from './fade-in-view'
// var inspect = require('util-inspect')

const styles = StyleSheet.create({
  baseText: {
    marginBottom: 10,
    textAlign: 'center'
  },
  content: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  }
})

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
          <Card style={{flex: 1, backgroundColor: '#fff'}}>
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
  // var inspect = require('util-inspect')
  // console.log('home after mapStateProps, decks ##########', inspect(decks))
  return { decks }
}

function mapDispatchToProps (dispatch) {
  return {
    getDecks: data => dispatch(home(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
