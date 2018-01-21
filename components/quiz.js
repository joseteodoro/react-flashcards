import React from 'react'
import { connect } from 'react-redux'
import { Card, Button } from 'react-native-elements'
import { View, Text } from 'react-native'
import Heading from './app-bar'
import { startQuiz, finishQuiz } from '../actions'
// var inspect = require('util-inspect')

let defaultState = {
  hits: 0,
  misses: 0,
  counter: 0,
  showAnswer: false
}

class Quiz extends React.Component {

  constructor ({props}) {
    super(props)
    this.state = defaultState
  }

  seeAnswer (showAnswer) {
    this.setState({showAnswer})
  }

  step (correctAnswer) {
    let {misses, counter, hits} = this.state
    if (correctAnswer) {
      hits = hits + 1
    } else {
      misses = misses + 1
    }
    counter = counter + 1
    this.setState({hits, misses, counter})
  }

  componentDidMount () {
    const { deckId } = this.props.navigation.state.params
    this.props.startQuiz({deckId})
  }

  render () {
    const inspect = require('util-inspect')
    console.log('view quiz ##########', inspect(this.props.quiz))
    return (
      <View style={{flex: 1}}>
        { this.props.quiz && this.props.quiz.deckName ? (
          <Heading title={`Quiz on ${this.props.quiz.deckName}`} navigation={this.props.navigation} />
        ) : (
          <Heading title='Loading quiz...' navigation={this.props.navigation} />
        ) }
        { this.props.quiz && this.props.quiz.deckName ? (
          <View style={{flex: 1}}>
            <View style={{flex: 1}}>
              <Text>header with how many questions and the number of the current question</Text>
              <Text>{`${this.state.counter + 1} of ${this.props.quiz.size}`}</Text>
            </View>
            <View style={{flex: 1}}>
              {this.state.showAnswer ? (
                <View>
                  <Text>{`Answer: ${this.props.quiz.cards[this.state.counter]}`}</Text>
                  <Button
                    backgroundColor='#03A9F4'
                    buttonStyle={{borderRadius: 0, margin: 1}}
                    title='See Question'
                    onPress={() => {
                      this.seeAnswer(false)
                    }} />
                </View>
              ) : (
                <View>
                  <Text>{`Question: ${this.props.quiz.cards[this.state.counter]}`}</Text>
                  <Button
                    backgroundColor='#03A9F4'
                    buttonStyle={{borderRadius: 0, margin: 1}}
                    title='See Answer'
                    onPress={() => {
                      this.seeAnswer(true)
                    }} />
                </View>
              )}
            </View>
            <View style={{flex: 1}}>
              <Button
                backgroundColor='#03A9F4'
                buttonStyle={{borderRadius: 0, margin: 1}}
                title='Next' disabled={this.state.counter + 1 >= this.props.quiz.size}
                onPress={() => {
                  this.seeAnswer(false)
                  this.step(true)
                }} />
            </View>
          </View>
        ) : (
          <View style={{flex: 1}}>
            <Text>Looking for questions ...</Text>
          </View>
        )}
      </View>
    )
  }
}

function mapStateToProps (parameters) {
  const inspect = require('util-inspect')
  console.log('view quiz mapStateToProps ##########', inspect(parameters))
  return { quiz: parameters.quiz }
}

function mapDispatchToProps (dispatch) {
  return {
    startQuiz: data => dispatch(startQuiz(data)),
    finishQuiz: data => dispatch(finishQuiz(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
