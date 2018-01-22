import React from 'react'
import { ListItem } from 'react-native-elements'

const CardItem = ({card, navigation}) => (
  <ListItem key={card.id} title={card.question} />
)

export default CardItem
