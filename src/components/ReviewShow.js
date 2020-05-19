import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import axios from 'axios'

export default function ReviewShow({item}) {

    const navigation = useNavigation()
    const { movieID } = item
    const [title, setTitle] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`https://carolinehoeg.com/semesterprojekt/api/movies/${movieID}`)
                setTitle(res.data.Title)
            } catch (error) {
                console.log(error)
            }
        }

        fetchData();
    }, [])

    const goToReview = data => {
        navigation.navigate('Review', data)
    }
    
    return (
        <View style={styles.reviewContent}>
            <View style={styles.header}>
                <Text style={styles.movieTitle}>{title}</Text>
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
    )
}

const styles = StyleSheet.create({
    reviewContent: {
        backgroundColor: '#222',
        paddingLeft: wp('4%'),
        paddingRight: wp('4%'),
        marginBottom: wp('4%'),
        paddingTop: wp('2%'),
        paddingBottom: wp('4%'),
        borderRadius: 10
    },
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
        paddingBottom: wp('2%')
    },
    movieTitle: {
        color: '#f5c518',
        fontSize: wp('4%'),
        fontWeight: 'bold',
        width: wp('50%')
    },
    review: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: wp('4%')
    },
    rate: {
        flexDirection: 'row'
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