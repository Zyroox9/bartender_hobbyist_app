import { StatusBar as ExpoBar }  from 'expo-status-bar' ;
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, Platform, StatusBar } from 'react-native';

// import CoctailCard from './CoctailCard';
import SettingsPage from './SettingsPage';

export default function App() {
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
  
      setCoctails(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getCoctails();
  }, [queryParams])

  return (
    <SafeAreaView style={styles.container}>
      <SettingsPage queryParams={queryParams} setQueryParams={setQueryParams} />


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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
});
