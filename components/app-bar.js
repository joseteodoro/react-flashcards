import React from 'react'
import { Header } from 'react-native-elements'
import { FontAwesome } from '@expo/vector-icons'

const Heading = ({title, navigation}) => <Header centerComponent={{ text: title, style: { color: '#fff', fontSize: 24 } }} rightComponent={<FontAwesome name='home' type='font-awesome' size={30} color='#fff' onPress={() => navigation.navigate('Home')} />} />

export default Heading
