import React from 'react'
import { Button } from 'react-native-elements'
import { View, Switch, Text, Picker } from 'react-native'
import DateTimePicker from 'react-native-modal-datetime-picker'
import moment from 'moment'
import Heading from './app-bar'
import {loadConfiguration} from '../storeUtils'
import updateLocaNotifications from '../notificationUtil'
import FadeInView from './fade-in-view'
import styles from './style'
// import inspect from 'util-inspect'

const defaultState = {
  notifications: false,
  quizSize: 5,
  notificationTime: new Date(),
  displayNotification: moment().format('hh:mm'),
  isDateTimePickerVisible: false
}

class ViewConfig extends React.Component {

  constructor (props) {
    super(props)
    this.state = defaultState
  }

  loadFromStore () {
    loadConfiguration((loadedConfig) => {
      this.setState({...loadedConfig, isDateTimePickerVisible: false})
    })
  }

  componentDidMount () {
    this.loadFromStore()
    this.setState({isDateTimePickerVisible: false})
  }

  save (viewConfig) {
    updateLocaNotifications(viewConfig)
  }

  render () {
    return (
      <FadeInView style={{flex: 1}}>
        <Heading title='Configurations' navigation={this.props.navigation} />
        <View style={styles.viewconfig} >
          <Text style={styles.content}>Send notifications to remember me?</Text>
          <Switch value={this.state.notifications} onValueChange={(value) => this.setState({notifications: value})} />
          <Text style={styles.content}>Remember me at:</Text>
          <Button
            backgroundColor='#03A9F4'
            buttonStyle={styles.buttonStyle}
            title={this.state.displayNotification} onPress={() => this.setState({ isDateTimePickerVisible: true })} />
          <DateTimePicker mode='time'
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={(notificationTime) => {
              const displayNotification = moment(notificationTime).format('hh:mm')
              this.setState({notificationTime, isDateTimePickerVisible: false, displayNotification})
            }}
            onCancel={() => this.setState({ isDateTimePickerVisible: false })}
          />
          <Text style={styles.content} >Quiz question size</Text>
        </View>
        <View>
          <Picker selectedValue={this.state.quizSize}
            onValueChange={(itemValue, itemIndex) => this.setState({quizSize: itemValue})}>
            <Picker.Item label='5' value={5} />
            <Picker.Item label='10' value={10} />
            <Picker.Item label='20' value={20} />
            <Picker.Item label='All Cards' value={1000} />
          </Picker>
        </View>
        <View style={{flex: 1, justifyContent: 'flex-end'}} >
          <Button
            backgroundColor='#03A9F4'
            buttonStyle={styles.buttonStyle}
            title='Save'
            onPress={() => {
              this.save(this.state)
              this.props.navigation.navigate('Home')
            }} />
          <Button
            backgroundColor='#03A9F4'
            buttonStyle={styles.buttonStyle}
            title='Cancel'
            onPress={() => {
              this.props.navigation.navigate('Home')
            }} />
        </View>
      </FadeInView>
    )
  }
}
export default ViewConfig
