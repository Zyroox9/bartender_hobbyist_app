import React, { useState, useEffect } from "react";
import { View, Switch, StyleSheet } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

const App = ({ queryParams, setQueryParams }) => {
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

    return (
        <View style={styles.container}>
        <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={queryParams.available ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={queryParams.available}
        />

        <DropDownPicker
            placeholder="Any"
            open={openStyle}
            value={valueStyle}
            items={itemsStyle}
            setOpen={setOpenStyle}
            setValue={setValueStyle}
            setItems={setItemsStyle}
            onChangeValue={handleStyleChange}
            />

        <DropDownPicker
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
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default App;