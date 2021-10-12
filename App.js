import { StatusBar as ExpoBar }  from 'expo-status-bar' ;
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, Platform, StatusBar } from 'react-native';

import CoctailPage from './CoctailPage';
import SettingsPage from './SettingsPage';

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

export default function App() {
  const [page, setPage] = useState('settings')
  const [coctails, setCoctails] = useState({});
  const [queryParams, setQueryParams] = useState({
    available: false,
    style: '',
    ingredient: ''
  });

  async function getCoctails() {
    try {
      const res = await fetch(`http://192.168.0.10:8000/?${new URLSearchParams(queryParams).toString()}`);
      // const res = await fetch('https://newtone-kursy.herokuapp.com/api/users/');
      const data = await res.json();
      console.log("GET COCTAILS")
      setCoctails(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    console.log("USE EFFECT APP")
    getCoctails();
  }, [queryParams])

  return (
    <SafeAreaView style={styles.container}>

      {page === 'settings' 
        ? <SettingsPage 
              queryParams={queryParams} 
              setQueryParams={setQueryParams}
              setPage={setPage} />
        : <CoctailPage 
              coctails={coctails} 
              setCoctails={setCoctails}
              setPage={setPage}
              page={page} />
        }

      {/* {coctails && coctails.length > 0 
          ? coctails.slice(0, 10).map( (coctail, index) => {
            return (
              <View key={index}>
              <Text>{coctail.name}</Text>
              </View>
              )
            
            })
          : <Text>Loading...</Text>
      } */}

      <ExpoBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: 'center',
    backgroundColor: COLORS.SHUTTLE_GREY,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
});
