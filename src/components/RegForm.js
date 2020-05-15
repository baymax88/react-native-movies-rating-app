import React, { useState } from 'react'
import { View, Text, StyleSheet, Keyboard } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Input, Button, Divider } from 'react-native-elements'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { useNavigation } from '@react-navigation/native'

export default function RegForm() {

  const [birthDate, setBirthDate] = useState(new Date());

  const navigation = useNavigation();

  const goTo = name => navigation.navigate(name);

  return (
    <View style={styles.boxContainer}>

      <Input placeholder="UserName" placeholderTextColor="#999" inputContainerStyle={styles.inputContainer} inputStyle={styles.input} leftIcon={<Icon name="user" size={24} color="#f5c518" />} />

      <Input placeholder="Password" placeholderTextColor="#999" inputContainerStyle={styles.inputContainer} secureTextEntry inputStyle={styles.input} leftIcon={<Icon name="key" size={24} color="#f5c518" />} />

      <Input placeholder="Confirm Password" placeholderTextColor="#999" inputContainerStyle={styles.inputContainer} secureTextEntry inputStyle={styles.input} leftIcon={<Icon name="key" size={24} color="#f5c518" />} />

      <Input placeholder="Birthday DD-MM-YYYY" placeholderTextColor="#999" inputContainerStyle={styles.inputContainer} inputStyle={styles.input} leftIcon={<Icon name="calendar" size={24} color="#f5c518" />} keyboardType="decimal-pad" />

      <Button type="clear" title="Register" titleStyle={styles.title} containerStyle={styles.buttonContainer} />

      <Divider />

      <View style={styles.regBtnContainer}>
        <Text style={styles.notice}>Already Have An Account?</Text>
        <Button type="clear" title="LogIn" titleStyle={styles.title} onPress={() => goTo('LogIn')} />
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  boxContainer: {
    backgroundColor: '#222',
    marginTop: wp('4%'),
    padding: wp('4%'),
    borderRadius: 10,
    marginBottom: wp('4%'),
  },
  title: {
    color: '#f5c518',
    fontSize: wp('4%')
  },
  input: {
    color: '#f5c518'
  },
  inputContainer: {
    width: wp('60%'),
    borderBottomColor: '#f5c518',
    borderBottomWidth: 1
  },
  buttonContainer: {
    marginBottom: wp('4%')
  },
  notice: {
    color: '#fff',
    fontSize: wp('4%')
  },
  regBtnContainer: {
    alignItems: 'center',
    paddingTop: wp('4%')
  },
  datePicker: {
    width: wp('60%'),
  }
});