import React from 'react'
import { List } from 'react-native-elements'
import Deck from './deck-list-item'

const DeckList = ({items, navigation}) => (
  <List>
    {
      items.map((item) => (
        <Deck key={item.id} deck={item} navigation={navigation} />
      ))
    }
  </List>
)

export default DeckList
