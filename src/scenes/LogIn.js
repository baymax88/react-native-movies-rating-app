import React from 'react'
import { View, ScrollView, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useNavigation } from '@react-navigation/native'

import LogInForm from '../components/LogInForm'

export default function LogIn() {

  const navigation = useNavigation();

  const goTo = (name) => {
    navigation.navigate(name);
  }

  return (
    <ScrollView contentContainerStyle={{height: hp('100%')}}>
    <View style={styles.container}>
      <TouchableOpacity onPress={() => goTo('Home')}>
        <Image source={require('../images/logo.png')} style={styles.logo} />
      </TouchableOpacity>
      <Text style={styles.title}>Log In</Text>
      <LogInForm />
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111',
  },
  logo: {
    width: wp('40%'),
    height: wp('24%')
  },
  title: {
    color: '#f5c518',
    fontSize: wp('5%'),
    fontWeight: 'bold',
  }
});