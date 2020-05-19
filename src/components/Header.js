import React, { useState, useContext } from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { SearchBar, Avatar, Button, Icon, getIconType } from 'react-native-elements'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useNavigation } from '@react-navigation/native'

import { GlobalContext } from '../context/GlobalState'

export default function Header({loggedIn, userPage}) {

  const [search, setSearch] = useState('');

  const { name, removeData } = useContext(GlobalContext)

  const navigation = useNavigation();

  const goTo = (n) => {
    navigation.navigate(n);
  }

  const logout = () => {
    removeData()
    goTo('Home')
  }

  const toSearch = () => {
    navigation.navigate('SearchResult', {keyword: search});
  }

  let rightElement = (loggedIn) ? <Button type="clear" title={name} containerStyle={styles.rightBtnContainer} buttonStyle={{padding: wp('2%')}} titleStyle={styles.title} onPress={() => goTo('UserProfile')} /> : <Button type="clear" title="LogIn" containerStyle={styles.rightBtnContainer} buttonStyle={{padding: wp('2%')}} titleStyle={styles.title} onPress={() => goTo('LogIn')} />;

  if (userPage) {
    rightElement = <Button type="clear" title="LogOut" containerStyle={styles.rightBtnContainer} buttonStyle={{padding: wp('2%')}} titleStyle={styles.title} onPress={logout} />
  }

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
        onSubmitEditing={() => toSearch()}
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
    width: wp('20%'),
  },
  title: {
    color: '#f5c518',
    fontSize: wp('4%')
  },
  searchContainer: {
    width: wp('50%'),
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
