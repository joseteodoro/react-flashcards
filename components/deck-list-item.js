import React from 'react'
import { ListItem } from 'react-native-elements'

const Deck = ({deck, navigation}) => (
  <ListItem
    key={deck.id}
    title={`${deck.name} [${deck.cards.length} cards]`}
    leftIcon={{name: deck.icon, size: 22}}
    onPress={() => navigation.navigate('ViewDeck', {id: deck.id})}
  />
)

export default Deck
