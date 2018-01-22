import React from 'react'
import { Animated } from 'react-native'

class FadeInView extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      fadeAnim: new Animated.Value(0)  // Initial value for opacity: 0
    }
  }

  componentDidMount () {
    const opts = {
      toValue: 1,
      duration: 2000
    }
    Animated.timing(this.state.fadeAnim, opts).start()
  }

  render () {
    let { fadeAnim } = this.state
    return (
      <Animated.View
        style={{
          ...this.props.style,
          opacity: fadeAnim
        }}
      >
        {this.props.children}
      </Animated.View>
    )
  }
}

export default FadeInView
