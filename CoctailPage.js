import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, TextInput } from 'react-native';

import CoctailCard from './CoctailCard';

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

export default function CoctailPage({ coctails, setPage, setQueryParams }) {
  const [search, setSearch] = useState('')
  const [coctailsFiltered, setCoctailsFiltered] = useState(null)
  const [randomCoctail, setRandomCoctail] = useState(null)



  useEffect( () => {
    filterCoctails()
    }, [search])

  useEffect( () => {
    getRandomCoctail()
  }, [coctailsFiltered])


  function handlePageChange() {
    setQueryParams({
      available: false,
      style: '',
      ingredient: ''
    })
    setPage('settings');
  }

  function handleSearch(value) {
    setSearch(value);
  }

  function getRandomCoctail() {
    if (coctailsFiltered && coctailsFiltered.length > 0) {
    let i = 0;
    let newRandom = {};
    while (true) {
      newRandom = coctailsFiltered[Math.floor(Math.random()*coctailsFiltered.length)];
      i++;
      if (newRandom != randomCoctail || i > 50) {
        break;
      }
    }

    setRandomCoctail(newRandom)
  }
  }

  function filterCoctails() {
    coctails && coctails.length > 0 
    && setCoctailsFiltered(coctails.filter( coctail =>  
      { return search === ''
        ? true
        : coctail.name.toLowerCase().includes(search.toLowerCase())        
      } ));
  }

  return (
    <View style={styles.container}>
  
      <View style={styles.searchBar}>
          <TextInput
            style={styles.input}
            value={search}
            onChangeText={handleSearch}
            placeholder="Search coctail..."
            ></TextInput>
      </View>

      <CoctailCard coctail={randomCoctail} />

      <View style={styles.nav}> 
        <View style={styles.buttonBack}>
          <Button 
            title="Settings"
            color={COLORS.EBONY_CLAY}
            onPress={handlePageChange}
          ></Button>
        </View>

        <View style={styles.buttonNext}>
          <Button 
            title="Next coctail"
            color={COLORS.EBONY_CLAY}
            onPress={getRandomCoctail}
          ></Button>
        </View>
      </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.SHUTTLE_GREY,
    alignSelf: 'stretch',
  },
  
  searchBar: {
    width: '80%',
    alignSelf: 'center'
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: COLORS.ALTO,
  },
  card: {
    flex: 15,
    borderRadius: 10,
    padding: 20,
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: COLORS.HEATHER
  },
  nav: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  },
  buttonBack: {
    flex: 1,
    justifyContent: "flex-start",
    marginRight: 15
  },
  buttonNext: {
    flex: 2,
    justifyContent: "center",
  },
});

