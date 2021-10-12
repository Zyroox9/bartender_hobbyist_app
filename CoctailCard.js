import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const COLORS = {
  WHITE: '#fff',
  BLACK: '#000',
  ALTO: '#dfdfdf',
  GREY: '#808080',
  EBONY_CLAY: '#292d3e',
  HEATHER: '#bfc7d5',
  LYNCH: '#697098',
  SHARK: '#242526',
  SHUTTLE_GREY: '#565E67'
}

export default function CoctailCard({ coctail }) {


  return (

      <View style={styles.card}>
      {!coctail 
      ? <Text>Loading</Text>
      : (
        <Text style={styles.name}>{coctail.name}</Text>
      )
      
      }
      </View>
    
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 15,
    borderRadius: 10,
    padding: 20,
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: COLORS.HEATHER
  },
  name: {

  },
  image: {

  },
});

