import React from 'react'
import { ListItem } from 'react-native-elements'

const Deck = ({deck, navigation}) => (
  <ListItem
    key={deck.id}
    title={`${deck.title} [${deck.questions.length} cards]`}
    leftIcon={{name: deck.icon, size: 22}}
    onPress={() => navigation.navigate(`deck/${deck.id}`)}
  />
)

export default Deck
