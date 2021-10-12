import React from 'react';
import { StyleSheet, Text } from 'react-native';


export default function App({ coctail }) {


  return (
    <Text>{coctail.name}</Text>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
