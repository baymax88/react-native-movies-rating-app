import React, { useContext, useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'

import Header from '../components/Header'

import { GlobalContext } from '../context/GlobalState'

export default function UserProfile() {

  const navigation = useNavigation()

  const { name, token } = useContext(GlobalContext)

  const [gender, setGender] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [reviews, setReviews] = useState([])
  const [ratings, setRatings] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      const config = {
        headers: {
          'x-access-token': token
        }
      }
  
      try {
        const res = await axios.get('https://carolinehoeg.com/semesterprojekt/api/info/user', config);

        setGender(res.data.gender)
        setBirthDate(res.data.birthday)
        setReviews(res.data.reviews)
        setRatings(res.data.ratings)
      } catch (error) {
        console.log(error)
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  const goToEdit = () => {
    const data = {
      userName: name,
      birthDate: birthDate,
      gender: gender
    }

    navigation.navigate('UserEdit', data)
  }

  return (
    <View>
      <Header userPage={true} />
      <ScrollView style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{name}</Text>
        </View>

        <View style={styles.userContent}>
          {isError && <Text style={{ color: '#fff' }}>Something went wrong...</Text>}
          {isLoading ? (<ActivityIndicator />) : <View style={styles.basicInfo}>
            <Text style={styles.basicText}>Gender: {gender}</Text>
            <Text style={styles.basicText}>BirthDay: {birthDate}</Text>
            <Button type="clear" title="Edit" onPress={() => goToEdit()} />
            <View style={styles.reviewContainer}>
              <Text style={styles.reviewTitle}>My Reviews and Ratings</Text>
            </View>
          </View>}
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
  titleContainer: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20
  },
  title: {
    color: '#f5c518',
    fontSize: wp('6%'),
    fontWeight: 'bold'
  },
  basicInfo: {
    alignItems: 'center'
  },
  basicText: {
    color: '#fff',
    fontSize: wp('4%'),
    marginBottom: wp('4%')
  },
  reviewContainer: {
    alignSelf: 'flex-start',
    marginLeft: wp('3%')
  },
  reviewTitle: {
    color: '#f5c518',
    fontSize: wp('5%'),
    fontWeight: 'bold',
    alignSelf: 'flex-end'
  },
})