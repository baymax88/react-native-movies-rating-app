import React, { useState, useEffect, useContext } from 'react'
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Button } from 'react-native-elements'
import axios from 'axios'

import Header from '../components/Header'
import MovieSummary from '../components/MovieSummary'

import { GlobalContext } from '../context/GlobalState'

export default function SearchResult({route}) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [finalPage, setFinalPage] = useState();
  const { keyword } = route.params;

  const { name } = useContext(GlobalContext)

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios.get(`https://carolinehoeg.com/semesterprojekt/api/movies/search/${keyword}/${page}`);

        setFinalPage(Math.ceil(result.data.totalResults / 10));
        setMovies(result.data.movieDTOs);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  const goToNext = async () => {
    setIsLoading(true);
    setMovies([])

    try {
      const result = await axios.get(`https://carolinehoeg.com/semesterprojekt/api/movies/search/${keyword}/${page + 1}`);

      await setPage(page + 1)
      await setMovies(result.data.movieDTOs);
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  }

  const goToPrev = async () => {
    setIsLoading(true);
    setMovies([])

    try {
      const result = await axios.get(`https://carolinehoeg.com/semesterprojekt/api/movies/search/${keyword}/${page - 1}`);

      await setPage(page - 1)
      await setMovies(result.data.movieDTOs);
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  }

  return (
    <View>
      <Header loggedIn={(name !== '')} />
      <ScrollView style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Search Result</Text>
        </View>

        <View style={styles.moviesContainer}>
          {isError && <Text style={{ color: '#fff' }}>Something went wrong...</Text>}
          {isLoading ? (<ActivityIndicator />) : movies.map(item => (
            <MovieSummary
              key={item.imdbID}
              movieID={item.imdbID}
              title={item.Title}
              url={item.Poster}
              avgRating={item.avgRating}
              year={item.Year}
            />
          ))}
        </View>
        {isLoading ? null : (
          <View style={styles.pageBtns}>
            <View style={{flex: 1}}>
              {(page !== 1) ? (<Button type="solid" title="Prev" onPress={goToPrev} />) : null}
            </View>
            <View style={{flex: 4, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={styles.pageNumber}>{page} / {finalPage}</Text>
            </View>
            <View style={{flex: 1}}>
              {(page !== finalPage) ? (<Button type="solid" title="Next" onPress={goToNext} />) : null}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    height: hp('87%'),
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
  },
  pageBtns: {
    flexDirection: 'row',
    marginBottom: wp('4%'),
    marginLeft: wp('5%'),
    marginRight: wp('5%')
  },
  pageNumber: {
    color: '#f5c518',
    fontSize: wp('4%'),
    fontWeight: 'bold'
  }
})