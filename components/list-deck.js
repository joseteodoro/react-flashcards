import React from 'react'
import { List } from 'react-native-elements'
import Deck from './deck-list-item'

const DeckList = ({items, navigation}) => (
  <List>
    {
      items.map((item, i) => (
        <Deck deck={item} key={`${i}_deck`} navigation={navigation} />
      ))
    }
  </List>
)

export default DeckList
