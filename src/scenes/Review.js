import React, { useContext, useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView, Text, Image, ActivityIndicator, TextInput, KeyboardAvoidingView  } from 'react-native'
import { Button } from 'react-native-elements'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import axios from 'axios'
import { Rating } from 'react-native-ratings'
import { useNavigation } from '@react-navigation/native'

import Header from '../components/Header'

import { GlobalContext } from '../context/GlobalState'

export default function Review({route}) {

  const { name, token } = useContext(GlobalContext)
  const { movieID, review_id, rating_id } = route.params

  const [movie, setMovie] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [rating, setRating] = useState(route.params.rating)
  const [review, setReview] = useState(route.params.review)

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const res = await axios.get(`https://carolinehoeg.com/semesterprojekt/api/movies/${movieID}`);

        setMovie(res.data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [movieID])

  const finishRating = rating => {
    setRating(rating)
  }

  const changeText = text => {
    setReview(text)
  }

  const goTo = (name) => {
    navigation.navigate(name);
  }

  const save = async () => {
    const rating_data = {
      id: rating_id,
      movieID,
      rating,
      username: name
    }

    const review_data = {
      id: review_id,
      movieID,
      review,
      username: name
    }

    const config = {
      headers: {
        'x-access-token': token
      }
    }

    try {
      const res = await axios.put('https://carolinehoeg.com/semesterprojekt/api/movies/edit/rating', rating_data, config);

      await setRating(res.data.rating)

    } catch (error) {
      console.log(error)
    }

    try {
      const res = await axios.put('https://carolinehoeg.com/semesterprojekt/api/movies/edit/review', review_data, config);

      await setReview(res.data.review)
      await goTo('Home')

    } catch (error) {
      console.log(error)
    }
  }

  const remove = async () => {
    const rating_data = {
      id: rating_id,
      movieID: movieID,
      username: name,
      rating: rating
    }

    const review_data = {
      id: review_id,
      movieID: movieID,
      username: name,
      review: review
    }

    const config = {
      headers: {
        'x-access-token': token
      }
    }

    try {
      await axios.delete('https://carolinehoeg.com/semesterprojekt/api/movies/delete/rating', rating_data, config);

    } catch (error) {
      console.log(error)
    }

    try {
      await axios.delete('https://carolinehoeg.com/semesterprojekt/api/movies/delete/review', review_data, config);

      goTo('Home')

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <KeyboardAvoidingView
      behavior="height"
    >
      <Header loggedIn={(name !== '')} />
      <ScrollView contentContainerStyle={styles.content} style={styles.scrollStyle}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Review</Text>
        </View>

        {isError && <Text style={{ color: '#fff' }}>Something went wrong...</Text>}
        {isLoading ? (<ActivityIndicator />) : (
          <View style={styles.updateContainer}>
            <Image source={{ uri: movie.Poster }} resizeMode="stretch" style={styles.poster} />
            <Text style={styles.movieTitle}>{movie.Title}</Text>
            <Rating
              ratingCount={10}
              imageSize={wp('8%')}
              showRating
              startingValue={parseInt(rating)}
              onFinishRating={finishRating}
            />
            <View style={styles.reviewInput}>
              <TextInput
                multiline
                numberOfLines={5}
                onChangeText={text => changeText(text)}
                value={review}
                style={styles.reviewFont}
              />
            </View>
            <View style={styles.btnsContainer}>
              <Button type="clear" title="Delete" titleStyle={styles.delete} containerStyle={styles.buttonContainer} onPress={remove} />

              <Button type="clear" title="Save" titleStyle={styles.save} containerStyle={styles.buttonContainer} onPress={save} />
            </View>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#121212'
  },
  scrollStyle: {
    height: hp('87%'),
  },
  titleContainer: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20
  },
  title: {
    color: '#f5c518',
    fontSize: wp('6%'),
    fontWeight: 'bold',
    width: wp('80%'),
    textAlign: 'center'
  },
  updateContainer: {
    marginLeft: wp('5%'),
    marginRight: wp('5%'),
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: wp('4%'),
    borderRadius: 10,
    marginBottom: wp('4%')
  },
  movieTitle: {
    color: '#222',
    fontSize: wp('5%'),
    fontWeight: 'bold',
    width: wp('80%'),
    textAlign: 'center',
    marginTop: wp('4%')
  },
  poster: {
    width: wp('30%'),
    height: wp('40%'),
    borderColor: '#222',
    borderWidth: 2
  },
  reviewInput: {
    marginTop: wp('10%'),
    width: wp('80%'),
    borderWidth: 1,
    borderColor: '#f5c518',
    borderRadius: 5,
  },
  reviewFont: {
    color: '#222',
    fontSize: wp('4%')
  },
  buttonContainer: {
    marginTop: wp('4%'),
    marginBottom: wp('4%')
  },
  save: {
    color: '#222',
    fontSize: wp('4%'),
  },
  delete: {
    color: '#222',
    fontSize: wp('4%'),
  },
  btnsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp('50%')
  },
})