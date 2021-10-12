import React, { useState, useEffect } from "react";
import { View, Switch, StyleSheet, Button, Alert, Text } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

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

const App = ({ queryParams, setQueryParams, setPage }) => {
    const toggleSwitch = () => setQueryParams({...queryParams, available: !queryParams.available});
    const [openStyle, setOpenStyle] = useState(false);
    const [valueStyle, setValueStyle] = useState(null);
    const [itemsStyle, setItemsStyle] = useState([
        {label: 'Any', value: ''},
        {label: 'Sour', value: 'SR'},
        {label: 'Creamy', value: 'CR'},
        {label: 'Spirit-Forward', value: 'SF'},
        {label: 'Champagne', value: 'CH'},
        {label: 'Highball', value: 'HI'},
        {label: 'Shot', value: 'SH'},
        {label: 'Other', value: 'OT'}
    ]);


    async function getIngredients() {
        try {
          const res = await fetch('http://192.168.0.10:8000/ingredients/');
          const data = await res.json();

          const firstElem = [{
            "id": '',
            "name": "Any"
            }]
      
          setItemsIngredient(firstElem.concat(data));
        } catch (err) {
          console.log(err);
        }
      }
    
      useEffect(() => {
        getIngredients();
      }, [])


    const [openIngredient, setOpenIngredient] = useState(false);
    const [valueIngredient, setValueIngredient] = useState(null);
    const [itemsIngredient, setItemsIngredient] = useState([]);

    function handleStyleChange(value) {
        setQueryParams({...queryParams, style: value}) 
    }

    function handleIngredientChange(value) {
        setQueryParams({...queryParams, ingredient: value}) 
    }

    function handlePageChange() {
      console.log("PAGE COCTAIL")
      setPage('coctail');
    }

    return (
        <View style={styles.container}>

        <View style={styles.switch}>
          <Text style={styles.label}>Only available coctails</Text>
          <Switch
              trackColor={{ false: "#767577", true: COLORS.HEATHER }}
              thumbColor={queryParams.available ? COLORS.EBONY_CLAY : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={queryParams.available}
          />
        </View>

        <View style={styles.dropdown}>
          <Text style={styles.label}>Ingredient</Text>
          <DropDownPicker
              zIndex={6000}
              maxHeight={350}
              theme="DARK"
              schema={{ label: 'name', value: 'id' }}
              searchable={true}
              searchPlaceholder="Search ingredient..."
              placeholder="Any"
              open={openIngredient}
              value={valueIngredient}
              items={itemsIngredient}
              setOpen={setOpenIngredient}
              setValue={setValueIngredient}
              setItems={setItemsIngredient}
              onChangeValue={handleIngredientChange}
              />
          </View>

        <View style={styles.dropdown}>
        <Text style={styles.label}>Coctail style</Text>
        <DropDownPicker
            theme="DARK"
            placeholder="Any"
            open={openStyle}
            value={valueStyle}
            items={itemsStyle}
            setOpen={setOpenStyle}
            setValue={setValueStyle}
            setItems={setItemsStyle}
            onChangeValue={handleStyleChange}
            />
        </View>   

          <View style={styles.button}>
            <Button 
              title="Let's go!"
              color={COLORS.EBONY_CLAY}
              onPress={handlePageChange}
            ></Button>
          </View>
        </View>
    );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 40,
    backgroundColor: COLORS.SHUTTLE_GREY,
  },
  label: {
    fontSize: 24,
    marginBottom: 14,
    color: COLORS.WHITE
  },
  switch: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },
  dropdown: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },
  button: {
    flex: 1,
    justifyContent: "center",
    zIndex: 4000,
  }
});

export default App;