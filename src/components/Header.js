import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { SearchBar, Avatar, Button, Icon } from 'react-native-elements'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

export default function Header({loggedIn}) {

  const [search, setSearch] = useState('');

  const rightElement = (loggedIn) ? <Avatar small rounded title="DY" activeOpacity={0.7} titleStyle={{color: '#fff'}} overlayContainerStyle={{backgroundColor: 'green'}} /> : <Button type="clear" title="LogIn" titleStyle={styles.title} />;

  return (
    <View style={styles.container}>
      <Button
        type="clear"
        icon={<Icon name="home" type="font-awesome" color="green" />}
      />

      <SearchBar
        inputStyle={styles.searchInput}
        inputContainerStyle={styles.searchInputContainer}
        value={search}
        onChangeText={(text) => setSearch(text)}
        placeholder="Type Here..."
        placeholderTextColor="#888"
        lightTheme={true}
        containerStyle={styles.searchContainer}
      />

      {rightElement}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: wp('4%'),
  },
  title: {
    color: 'green',
    fontSize: wp('4%')
  },
  searchContainer: {
    width: wp('60%'),
    backgroundColor: '#fff',
  },
  searchInput: {
    color: 'green',
    backgroundColor: '#fff'
  },
  searchInputContainer: {
    backgroundColor: '#fff',
  }
})
