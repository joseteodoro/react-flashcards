import React from 'react'
import { List } from 'react-native-elements'
import CardItem from './card-list-item'

const CardList = ({cards, navigation}) => (
  <List>
    {
      cards.map((item, i) => (
        <CardItem card={item} key={`${i}_card`} navigation={navigation} />
      ))
    }
  </List>
)

export default CardList
