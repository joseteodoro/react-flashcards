import React from 'react'
import { List, ListItem } from 'react-native-elements'

const DeckList = ({items}) => (
  <List>
    {
      items.map((item, i) => (
        <ListItem
          key={i}
          title={item.title}
          leftIcon={{name: item.icon, size: 22}}
          onPress={() => console.log(`Calling the ${item.title}`)}
        />
      ))
    }
  </List>
)

export default DeckList
