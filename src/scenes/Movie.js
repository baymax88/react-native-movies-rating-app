import React, { useState, useEffect, useContext } from 'react'
import { View, Text, ScrollView, StyleSheet, Image, ActivityIndicator } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import axios from 'axios'
import { Button, Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

import Header from '../components/Header'
import { GlobalContext } from '../context/GlobalState'

export default function Movie({route}) {

    const { name } = useContext(GlobalContext)
    const { movieID } = route.params
    const navigation = useNavigation();

    const [movie, setMovie] = useState({})
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [reviewAndRatings, setReviewAndRatings] = useState([])

    const buttonPress = () => {
        (name !== '') ? navigation.navigate('AddReview', {movieID}) : navigation.navigate('LogIn')
    }
  
    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);

            try {
                const result = await axios.get(`https://carolinehoeg.com/semesterprojekt/api/movies/${movieID}`);

                let temp = [];
                setMovie(result.data);
                result.data.review.map(review => {
                    result.data.rating.map(rating => {
                        if (review.user === rating.user) {
                            temp.push({
                                id: review.id,
                                user: review.user,
                                review: review.review,
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

    return (
        <View>
            <Header loggedIn={(name !== '')} />
            {isError && <Text style={{ color: '#fff' }}>Something went wrong...</Text>}
            {isLoading ? (<ActivityIndicator />) : (
                <ScrollView contentContainerStyle={styles.container} style={{height: hp('90%')}}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{movie.Title}</Text>
                    </View>
                    <View>
                        <Image source={{ uri: movie.Poster }} resizeMode="stretch" style={styles.poster} />
                        <Text style={styles.text}>Average Rating:  {movie.avgRating}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.text}>Year:  {movie.Year}</Text>
                        <Text style={styles.text}>Rated:  {movie.Rated}</Text>
                        <Text style={styles.text}>Released:  {movie.Released}</Text>
                        <Text style={styles.text}>Runtime:  {movie.Runtime}</Text>
                        <Text style={styles.text}>Genre:  {movie.Genre}</Text>
                        <Text style={styles.text}>Actors:  {movie.Actors}</Text>
                        <Text style={styles.text}>Language:  {movie.Language}</Text>
                        <Text style={styles.text}>Awards:  {movie.Awards}</Text>
                        <Text style={styles.text}>Type:  {movie.Type}</Text>
                        <Text style={styles.text}>DVD Release:  {movie.DVD}</Text>
                        <Text style={styles.text}>Production:  {movie.Production}</Text>
                    </View>

                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>User Review</Text>
                    </View>

                    <Button type="clear" title={(name !== '') ? "Add rating and review" : "Log In to add rating and review"} containerStyle={styles.button} onPress={buttonPress} />
                    {reviewAndRatings.map(item => (
                        <View key={item.id} style={styles.reviewContent}>
                            <View style={styles.header}>
                                <Text style={styles.movieTitle}>{item.user}</Text>
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

                </ScrollView>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        color: '#f5c518',
        fontSize: wp('6%'),
        fontWeight: 'bold',
        textAlign: 'center'
    },
    container: {
        minHeight: wp('90%'),
        alignItems: 'center',
        backgroundColor: '#fefefe',
    },
    poster: {
        marginTop: wp('4%'),
        width: wp('50%'),
        height: wp('60%'),
        borderColor: '#222',
        borderWidth: 2
    },
    text: {
        color: '#222',
        fontSize: wp('4%'),
        fontWeight: 'bold',
        textAlign: 'center'
    },
    infoContainer: {
        width: wp('80%'),
        backgroundColor: '#767676',
        padding: wp('4%'),
        marginTop: wp('5%'),
        borderRadius: 5
    },
    titleContainer: {
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20
    },
    button: {
        marginBottom: wp('5%')
    },
    reviewContent: {
        backgroundColor: '#767676',
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