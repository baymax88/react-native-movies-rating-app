import React, { useContext, useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Button, Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'

import Header from '../components/Header'

import { GlobalContext } from '../context/GlobalState'

export default function UserProfile() {

  const navigation = useNavigation()

  const { name, token } = useContext(GlobalContext)

  const [gender, setGender] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [reviewAndRatings, setReviewAndRatings] = useState([])
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

        let temp = [];
        setGender(res.data.gender)
        setBirthDate(res.data.birthday)
        res.data.reviews.map(review => {
          res.data.ratings.map(rating => {
            if (review.movieID === rating.movieID) {
              temp.push({
                movieID: review.movieID,
                review_id: review.id,
                review: review.review,
                rating_id: rating.id,
                rating: rating.rating
              })
            }
          })
        })

        setReviewAndRatings(temp)
      } catch (error) {
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

  const goToReview = data => {
    navigation.navigate('Review', data)
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
              {reviewAndRatings.map(item => (
                <View key={item.movieID} style={styles.reviewContent}>
                  <View style={styles.header}>
                    <Text style={styles.movieTitle}>{item.movieID}</Text>
                    <Button type="clear" title="Edit Review" onPress={() => goToReview(item)} />
                  </View>
                  <View style={styles.review}>
                    <Text style={styles.desc}>{item.review}</Text>
                    <View style={styles.rate}>
                      <Icon name="star" type="font-awesome" color="#f5c518" />
                      <Text style={styles.reteNum}>{item.rating} / 10.0</Text>
                    </View>
                  </View>
                </View>
              ))}
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
    backgroundColor: '#121212',
  },
  titleContainer: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20
  },
  userContent: {
    marginBottom: wp('5%')
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
    width: wp('90%'),
  },
  reviewTitle: {
    color: '#f5c518',
    fontSize: wp('5%'),
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: wp('4%')
  },
  reviewContent: {
    backgroundColor: '#222',
    paddingLeft: wp('4%'),
    paddingRight: wp('4%'),
    marginBottom: wp('4%'),
    paddingTop: wp('2%'),
    paddingBottom: wp('4%'),
    borderRadius: 10
  },
  review: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: wp('4%')
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    paddingBottom: wp('2%')
  },
  rate: {
    flexDirection: 'row'
  },
  movieTitle: {
    color: '#f5c518',
    fontSize: wp('4%'),
    fontWeight: 'bold'
  },
  desc: {
    color: '#fff',
    fontSize: wp('4%'),
    width: wp('50%')
  },
  reteNum: {
    color: '#fff',
    fontSize: wp('4%'),
    marginLeft: wp('2%')
  }
})