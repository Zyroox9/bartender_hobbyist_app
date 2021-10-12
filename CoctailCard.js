import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

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

const METHODS = {
  SH: 'Shake',
  ST: 'Stir',
  BD: 'Build',
  MD: 'Muddle',
  TH: 'Throw',
  SW: 'Swizzle'
}

export default function CoctailCard({ coctail }) {


  return (

      <View style={styles.card}>
      {!coctail 
      ? <Text>Loading</Text>
      : (
        <View>
        <Text style={styles.name}>{coctail.name}</Text>
        <View style={styles.box}>
          <Image
          style={styles.image}
          source={{
            uri: coctail.image
          }}
          />
          <View style={styles.smallBox}>
            <View style={styles.priceBox}>
              <Text style={styles.sideText}>Produkcja:</Text>
              <Text style={styles.sideText}>{coctail.cost} zł</Text>
            </View>
            <View style={styles.methodBox}>
            <Text style={styles.sideText}>Metoda:</Text>
              <Text style={styles.sideText}>{METHODS[coctail.method]}</Text>
            </View>
          </View>
        </View>
        {coctail.recipe.map( ingredient => {
          return <Text style={styles.recipe} key={ingredient.order}>{ingredient.how_much}ml {ingredient.ingredient_name}</Text>
        })}
        <Text style={styles.instructions}>{coctail.instructions}</Text>
        <Text style={styles.optional}>{coctail.optional}</Text>
        </View>
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
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  box: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 15
  },
  image: {
    flex: 1,
    width: 150,
    height: 200,
    borderRadius: 8
  },
  smallBox: {
    flex: 1,
    alignItems: 'center',
  },
  priceBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  methodBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sideText: {
    fontSize: 18
  },
  recipe: {
    fontSize: 18,
  },
  instructions: {
    fontSize: 17,
    marginTop: 15
  },
  optional: {
    marginTop: 15,
    fontSize: 16,
  },
});

