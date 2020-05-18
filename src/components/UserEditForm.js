import React, { useState, useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Input, Button } from 'react-native-elements'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { useNavigation } from '@react-navigation/native'
import { Picker } from '@react-native-community/picker'
import axios from 'axios'

import { GlobalContext } from '../context/GlobalState'

export default function RegForm({token, orgName, orgDate, orgGender}) {

  const [birthDate, setBirthDate] = useState(orgDate);
  const [gender, setGender] = useState(orgGender);
  const [userName, setUserName] = useState(orgName);

  const { setName, removeData } = useContext(GlobalContext)

  const save = async () => {
    const data = {
      username: userName,
      gender,
      birthday: birthDate
    }

    const config = {
      headers: {
        'x-access-token': token
      }
    }

    try {
      const res = await axios.put('https://carolinehoeg.com/semesterprojekt/api/info/user/edit', data, config);

      await setName(res.data.username)
      await goTo('Home')

    } catch (error) {
      console.log(error)
    }
  }

  const remove = async () => {
    const config = {
      headers: {
        'x-access-token': token
      }
    }

    try {
      await axios.delete('https://carolinehoeg.com/semesterprojekt/api/info/user/delete', config);

      removeData()
      goTo('Home')

    } catch (error) {
      console.log(error)
    }
  }

  const navigation = useNavigation();

  const goTo = name => navigation.navigate(name);

  return (
    <View style={styles.boxContainer}>

      <Input placeholder="UserName" placeholderTextColor="#999" inputContainerStyle={styles.inputContainer} inputStyle={styles.input} leftIcon={<Icon name="user" size={24} color="#f5c518" />} value={userName} onChangeText={text => setUserName(text)} />

      <Input placeholder="Birthday DD-MM-YYYY" placeholderTextColor="#999" inputContainerStyle={styles.inputContainer} inputStyle={styles.input} leftIcon={<Icon name="calendar" size={24} color="#f5c518" />} keyboardType="decimal-pad" value={birthDate} onChangeText={text => setBirthDate(text)} />

      <View style={styles.picker}>
        <Picker selectedValue={gender} onValueChange={(itemValue, itemIndex) => setGender(itemValue)}>
          <Picker.Item label="Gender" value="" color="#999" />
          <Picker.Item label="Male" value="Male" color="#f5c518" />
          <Picker.Item label="Female" value="Female" color="#f5c518" />
          <Picker.Item label="Other" value="Other" color="#f5c518" />
        </Picker>
      </View>

      <View style={styles.btnsContainer}>
        <Button type="clear" title="Delete" titleStyle={styles.delete} containerStyle={styles.buttonContainer} onPress={remove} />

        <Button type="clear" title="Save" titleStyle={styles.save} containerStyle={styles.buttonContainer} onPress={save} />
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
  btnsContainer: {
    marginTop: wp('5%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  picker: {
    width: wp('60%'),
    borderBottomColor: '#f5c518',
    borderBottomWidth: 1,
    alignSelf: 'center',
    color: '#f5c518'
  },
  delete: {
    color: '#fff',
    fontSize: wp('4%')
  },
  save: {
    color: '#fff',
    fontSize: wp('4%')
  },
  input: {
    color: '#fff',
  },
  inputContainer: {
    width: wp('60%'),
    borderBottomColor: '#f5c518',
    borderBottomWidth: 1,
    alignSelf: 'center'
  },
  buttonContainer: {
    marginTop: wp('4%'),
    marginBottom: wp('4%')
  },
  datePicker: {
    width: wp('60%'),
  }
});