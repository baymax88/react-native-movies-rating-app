import React, { useContext } from 'react'
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

import Header from '../components/Header'
import UserEditForm from '../components/UserEditForm'

import { GlobalContext } from '../context/GlobalState'

export default function UserEdit({route}) {

  const { name, token } = useContext(GlobalContext)
  const { userName, birthDate, gender } = route.params

  return (
    <View>
      <Header loggedIn={(name !== '')} />
      <ScrollView style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Edit User</Text>
        </View>

        <View style={styles.updateContainer}>
          <UserEditForm token={token} orgName={userName} orgDate={birthDate} orgGender={gender} />
        </View>
      </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
  content: {
    height: hp('90%'),
    backgroundColor: '#121212'
  },
  updateContainer: {
    marginLeft: wp('5%'),
    marginRight: wp('5%')
  },
  titleContainer: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20
  },
  title: {
    color: '#fff',
    fontSize: wp('6%'),
    fontWeight: 'bold'
  },
})