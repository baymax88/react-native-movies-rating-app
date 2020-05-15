import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Input, Button, Divider } from 'react-native-elements'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'

import { GlobalContext } from '../context/GlobalState'

export default function LogInForm() {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const { setData } = useContext(GlobalContext)

  const onSubmit = () => {
    const loginData = {
      username: userName,
      password
    }

    login(loginData)
  }

  async function login(loginData) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const res = await axios.post('https://carolinehoeg.com/semesterprojekt/api/login', loginData, config);

      await setData(res.data);

      await goTo('Home')

    } catch (error) {
      console.log(error)
    }
  }

  const navigation = useNavigation();

  const goTo = name => navigation.navigate(name);

  return (
    <View style={styles.boxContainer}>

      <Input placeholder="UserName" placeholderTextColor="#999" inputContainerStyle={styles.inputContainer} inputStyle={styles.input} leftIcon={<Icon name="user" size={24} color="#f5c518" />} value={userName} onChangeText={text => setUserName(text)} />

      <Input placeholder="Password" placeholderTextColor="#999" inputContainerStyle={styles.inputContainer} secureTextEntry inputStyle={styles.input} leftIcon={<Icon name="key" size={24} color="#f5c518" />} value={password} onChangeText={text => setPassword(text)} />

      <Button type="clear" title="LogIn" titleStyle={styles.title} containerStyle={styles.buttonContainer} onPress={onSubmit} />

      <Divider />

      <View style={styles.regBtnContainer}>
        <Text style={styles.notice}>Don't Have An Account?</Text>
        <Button type="clear" title="Register" titleStyle={styles.title} onPress={() => goTo('Register')} />
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
    marginBottom: wp('4%')
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
  }
});