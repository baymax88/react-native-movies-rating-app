import React, { useState } from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { SearchBar, Avatar, Button, Icon } from 'react-native-elements'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

export default function Header({loggedIn}) {

  const [search, setSearch] = useState('');

  const rightElement = (loggedIn) ? <Avatar small rounded title="DY" activeOpacity={0.7} titleStyle={{color: '#222'}} overlayContainerStyle={{backgroundColor: 'gold'}} /> : <Button type="clear" title="LogIn" titleStyle={styles.title} />;

  return (
    <View style={styles.container}>

      {/* <Button
        type="clear"
        icon={<Icon name="home" type="font-awesome" color="gold" />}
      /> */}
      
      <TouchableOpacity>
        <Image source={require("../images/logo.png")} style={{width: 80, height: 50}} />
      </TouchableOpacity>

      <SearchBar
        inputStyle={styles.searchInput}
        inputContainerStyle={styles.searchInputContainer}
        value={search}
        onChangeText={(text) => setSearch(text)}
        placeholder="Type Here..."
        placeholderTextColor="#999"
        lightTheme={true}
        containerStyle={styles.searchContainer}
      />

      {rightElement}

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 64,
    backgroundColor: '#222',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: wp('2%'),
    elevation: 20
  },
  title: {
    color: 'gold',
    fontSize: wp('4%')
  },
  searchContainer: {
    width: wp('60%'),
    backgroundColor: '#222',
  },
  searchInput: {
    color: 'gold',
    backgroundColor: '#222'
  },
  searchInputContainer: {
    backgroundColor: '#222',
  }
})
