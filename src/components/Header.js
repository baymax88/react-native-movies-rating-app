import React, { useState, useContext } from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { SearchBar, Avatar, Button, Icon } from 'react-native-elements'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useNavigation } from '@react-navigation/native'

import { GlobalContext } from '../context/GlobalState'

export default function Header({loggedIn}) {

  const [search, setSearch] = useState('');

  const { userName } = useContext(GlobalContext)

  const navigation = useNavigation();

  const goTo = (name) => {
    navigation.navigate(name);
  }

  const rightElement = (loggedIn) ? <Button type="clear" title={userName} containerStyle={styles.rightBtnContainer} titleStyle={styles.title} onPress={() => goTo('LogIn')} /> : <Button type="clear" title="LogIn" containerStyle={styles.rightBtnContainer} titleStyle={styles.title} onPress={() => goTo('LogIn')} />;

  return (
    <View style={styles.container}>
      
      <TouchableOpacity onPress={() => goTo('Home')}>
        <Image source={require("../images/logo.png")} style={styles.logo} />
      </TouchableOpacity>

      <SearchBar
        inputStyle={styles.searchInput}
        inputContainerStyle={styles.searchInputContainer}
        value={search}
        onChangeText={(text) => setSearch(text)}
        placeholder="Type Here..."
        placeholderTextColor="#999"
        containerStyle={styles.searchContainer}
      />

      {rightElement}

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: hp('10%'),
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: wp('2%'),
    elevation: 20
  },
  logo: {
    width: wp('20%'),
    height: wp('12%')
  },
  rightBtnContainer: {
    width: wp('20%')
  },
  title: {
    color: '#f5c518',
    fontSize: wp('4%')
  },
  searchContainer: {
    width: wp('60%'),
    backgroundColor: '#000',
    borderTopColor: '#000',
    borderBottomColor: '#000'
  },
  searchInput: {
    color: '#f5c518',
    backgroundColor: '#000',
  },
  searchInputContainer: {
    backgroundColor: '#000',
  }
})
