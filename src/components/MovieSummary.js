import React from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

export default function MovieSummary({ title, url, avgRating, year }) {
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={{ uri: url }} resizeMode="stretch" style={styles.poster} />
      <View style={styles.content}>
        <View style={styles.rate}>
          <Icon name="star" type="font-awesome" color="#f5c518" />
          <Text style={styles.year}>{avgRating.toFixed(1)} / 10.0</Text>
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.year}>{year}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1d1f21',
    marginBottom: wp('5%'),
    paddingLeft: wp('5%'),
    paddingRight: wp('5%'),
    paddingTop: wp('4%'),
    paddingBottom: wp('4%'),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10
  },
  poster: {
    width: wp('30%'),
    height: wp('40%'),
    borderColor: '#f5c518',
    borderWidth: 1
  },
  content: {
    marginLeft: wp('10%'),
    width: wp('42%'),
    height: wp('35%'),
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  rate: {
    flexDirection: 'row'
  },
  title: {
    color: '#f5c518',
    fontSize: wp('4%'),
    marginLeft: 4,
    alignSelf: 'flex-start'
  },
  year: {
    color: '#fff',
    fontSize: wp('4%'),
    marginLeft: 4,
    alignSelf: 'flex-end'
  }
})