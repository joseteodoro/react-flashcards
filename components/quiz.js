import React from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet } from 'react-native'
import Heading from './app-bar'
import ViewAnswer from './view-answer'
import ViewQuestion from './view-question'
import QuizSummary from './quiz-summary'
import { startQuiz, finishQuiz } from '../actions'
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
    this.seeAnswer(false)
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
    return (
      <View style={{flex: 1}}>
        { this.props.quiz && this.props.quiz.deckName ? (
          <Heading title={`Quiz on ${this.props.quiz.deckName}`} navigation={this.props.navigation} />
        ) : (
          <Heading title='Loading quiz...' navigation={this.props.navigation} />
        ) }
        { this.props.quiz && this.props.quiz.deckName ? (
          <View style={{flex: 1}}>
            {this.props.quiz.size <= this.state.counter ? (
              <QuizSummary
                styles={styles}
                deckId={this.props.navigation.state.params.deckId}
                hits={this.state.hits}
                questionsCount={this.props.quiz.size}
                navigation={this.props.navigation} />
            ) : (
              <View>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={styles.baseText}>{`${this.state.counter + 1} of ${this.props.quiz.size}`}</Text>
                </View>
                <View >
                  {!this.state.showAnswer ? (
                    <ViewQuestion styles={styles}
                      card={this.props.quiz.cards[this.state.counter]}
                      buttonFunction={() => { this.seeAnswer(true) }} />
                  ) : (
                    <ViewAnswer styles={styles}
                      card={this.props.quiz.cards[this.state.counter]}
                      buttonActionCorrect={() => {
                        this.step(true)
                      }}
                      buttonActionIncorrect={() => {
                        this.step(false)
                      }}
                    />
                  )}
                </View>
              </View>
            )}
          </View>
        ) : (
          <View style={{flex: 1}}>
            <Text style={styles.baseText}>Looking for questions ...</Text>
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
