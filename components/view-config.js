import React from 'react'
import { connect } from 'react-redux'
import { Card, Button } from 'react-native-elements'
import { View, Switch, AsyncStorage, StyleSheet, Text, Picker } from 'react-native'
import Heading from './app-bar'
import { updateQuizSize } from '../actions'
import updateLocaNotifications from '../notificationUtil'
import FadeInView from './fade-in-view'

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

const defaultState = {
  notifications: false,
  quizSize: 5,
  notificationHour: 12,
  notificationMinute: 0
}

class ViewConfig extends React.Component {

  constructor (props) {
    super(props)
    this.state = defaultState
  }

  loadFromStore () {
    AsyncStorage.getItem('ViewConfig')
      .then((viewConfig) => {
        const loadedConfig = ((viewConfig && JSON.parse(viewConfig)) || defaultState)
        this.setState(loadedConfig)
      })
  }

  componentDidMount () {
    this.loadFromStore()
  }

  save (viewConfig) {
    updateLocaNotifications(viewConfig)
    AsyncStorage.setItem('ViewConfig', JSON.stringify(viewConfig))
    .then((_) => {
      updateQuizSize(viewConfig)
    })
  }

  getChilds (amount) {
    (Array(amount).map((month, i) => {
      return <Picker.Item label='banana' value='banana' key={i} />
    }))
  }

  render () {
    return (
      <FadeInView style={{flex: 1}}>
        <Heading title='Configurations' navigation={this.props.navigation} />
        <Card style={{ backgroundColor: '#fff' }}>
          <Text style={styles.content}>Send notifications to remember me?</Text>
          <Switch value={this.state.notifications} onValueChange={(value) => this.setState({notifications: value})} />
          <Text style={styles.content}>Remember me at:</Text>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <Picker selectedValue={this.state.notificationHour}
              onValueChange={(itemValue, itemIndex) => this.setState({notificationHour: itemValue})}>
              {this.getChilds(24)}
            </Picker>
            <Picker selectedValue={this.state.notificationMinute}
              onValueChange={(itemValue, itemIndex) => this.setState({notificationMinute: itemValue})}>
              {this.getChilds(60)}
            </Picker>
          </View>
          <Text style={styles.content}>Quiz question size</Text>
          <Picker selectedValue={this.state.quizSize}
            onValueChange={(itemValue, itemIndex) => this.setState({quizSize: itemValue})}>
            <Picker.Item label='5' value={5} />
            <Picker.Item label='10' value={10} />
            <Picker.Item label='20' value={20} />
          </Picker>
          <Button
            backgroundColor='#03A9F4'
            buttonStyle={{borderRadius: 0, margin: 1}}
            title='Save'
            onPress={() => {
              const {notifications, quizSize, notificationTime, localNotificationId} = this.props
              this.save({notifications, quizSize, notificationTime, localNotificationId})
              this.props.navigation.navigate('Home')
            }} />
          <Button
            backgroundColor='#03A9F4'
            buttonStyle={{borderRadius: 0, margin: 1}}
            title='Cancel'
            onPress={() => {
              this.props.navigation.navigate('Home')
            }} />
        </Card>
      </FadeInView>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    updateQuizSize: data => dispatch(updateQuizSize(data))
  }
}

export default connect(null, mapDispatchToProps)(ViewConfig)
