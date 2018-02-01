import React from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'
import Heading from './app-bar'
import ViewAnswer from './view-answer'
import ViewQuestion from './view-question'
import QuizSummary from './quiz-summary'
import { startQuiz, finishQuiz } from '../actions'
import FadeInView from './fade-in-view'
import styles from './style'
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
      <FadeInView style={{flex: 1}}>
        { this.props.quiz && this.props.quiz.deckName ? (
          <Heading title={`Quiz on ${this.props.quiz.deckName}`} navigation={this.props.navigation} />
        ) : (
          <Heading title='Loading quiz...' navigation={this.props.navigation} />
        ) }
        { this.props.quiz && this.props.quiz.deckName ? (
          <View style={styles.flex}>
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
          <View style={styles.flex}>
            <Text style={styles.baseText}>Looking for questions ...</Text>
          </View>
        )}
      </FadeInView>
    )
  }
}

function mapStateToProps (parameters) {
  return { quiz: parameters.quiz }
}

function mapDispatchToProps (dispatch) {
  return {
    startQuiz: data => dispatch(startQuiz(data)),
    finishQuiz: data => dispatch(finishQuiz(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
