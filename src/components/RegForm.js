import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Input, Button, Divider } from 'react-native-elements'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { useNavigation } from '@react-navigation/native'
import { Picker } from '@react-native-community/picker'
import axios from 'axios'

export default function RegForm() {

  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [errShow, setErrShow] = useState(false);

  const confirm = text => {
    if (text !== password) {
      setErrShow(true)
    } else {
      setErrShow(false)
    }
  }

  const onSubmit = () => {
    const regData = {
      username: userName,
      password,
      gender,
      birthday: birthDate
    }

    register(regData)
  }

  async function register(regData) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const res = await axios.post('https://carolinehoeg.com/semesterprojekt/api/login/register', regData, config);

      await goTo('LogIn')

    } catch (error) {
      console.log(error)
    }
  }

  const navigation = useNavigation();

  const goTo = name => navigation.navigate(name);

  return (
    <View style={styles.boxContainer}>

      <Input placeholder="UserName" placeholderTextColor="#999" inputContainerStyle={styles.inputContainer} inputStyle={styles.input} leftIcon={<Icon name="user" size={24} color="#f5c518" />} value={userName} onChangeText={text => setUserName(text)} renderErrorMessage={false} />

      <Input placeholder="Password" placeholderTextColor="#999" inputContainerStyle={styles.inputContainer} secureTextEntry inputStyle={styles.input} leftIcon={<Icon name="key" size={24} color="#f5c518" />} value={password} onChangeText={text => setPassword(text)} renderErrorMessage={false} />

      <Input placeholder="Confirm Password" placeholderTextColor="#999" inputContainerStyle={styles.inputContainer} secureTextEntry inputStyle={styles.input} leftIcon={<Icon name="key" size={24} color="#f5c518" />} renderErrorMessage={false} onChangeText={text => confirm(text)} />
      { errShow && <Text style={styles.errorMsg}>Password is incorrect</Text> }

      <Input placeholder="Birthday DD-MM-YYYY" placeholderTextColor="#999" inputContainerStyle={styles.inputContainer} inputStyle={styles.input} leftIcon={<Icon name="calendar" size={24} color="#f5c518" />} keyboardType="decimal-pad" value={birthDate} onChangeText={text => setBirthDate(text)} />

      <View style={styles.picker}>
        <Picker selectedValue={gender} onValueChange={(itemValue, itemIndex) => setGender(itemValue)}>
          <Picker.Item label="Gender" value="" color="#999" />
          <Picker.Item label="Male" value="Male" color="#f5c518" />
          <Picker.Item label="Female" value="Female" color="#f5c518" />
          <Picker.Item label="Other" value="Other" color="#f5c518" />
        </Picker>
      </View>

      <Button type="clear" title="Register" titleStyle={styles.title} containerStyle={styles.buttonContainer} onPress={onSubmit} />

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
  picker: {
    width: wp('60%'),
    borderBottomColor: '#f5c518',
    borderBottomWidth: 1,
    alignSelf: 'center',
    color: '#f5c518'
  },
  errorMsg: {
    marginLeft: wp('4%'),
    marginTop: wp('1%'),
    color: 'red',
    fontSize: wp('3%')
  },
  title: {
    color: '#f5c518',
    fontSize: wp('4%')
  },
  input: {
    color: '#f5c518',
  },
  inputContainer: {
    width: wp('60%'),
    borderBottomColor: '#f5c518',
    borderBottomWidth: 1
  },
  buttonContainer: {
    marginTop: wp('4%'),
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