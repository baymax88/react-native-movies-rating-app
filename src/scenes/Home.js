import React, { useState, useEffect, useContext } from 'react'
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import axios from 'axios'

import Header from '../components/Header'
import MovieSummary from '../components/MovieSummary'

import { GlobalContext } from '../context/GlobalState'

export default function Home() {
  const [topMovies, setTopMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { name } = useContext(GlobalContext)

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios.get('https://carolinehoeg.com/semesterprojekt/api/movies/topten');

        setTopMovies(result.data.movieDTOs);
      } catch (error) {
        console.log(error)
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <View>
      <Header loggedIn={(name !== '')} />
      <ScrollView style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Top Ten Movies Right Now</Text>
        </View>

        <View style={styles.moviesContainer}>
          {isError && <Text style={{ color: '#fff' }}>Something went wrong...</Text>}
          {isLoading ? (<ActivityIndicator />) : topMovies.map((item, index) => (
            <MovieSummary
              key={index}
              movieID={item.imdbID}
              title={item.Title}
              url={item.Poster}
              avgRating={item.avgRating}
              year={item.Year}
            />
          ))}
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
  moviesContainer: {
    margin: wp('4%')
  },
  whiteColor: {
    color: '#fff'
  }
})