import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import Form from './components/form';
import Weather from './components/weather';

const App = () => {
  const [search, setSearch] = useState({
    city: '',
    country: '',
  });
  const [consult, setConsult] = useState(false);
  const [result, setResult] = useState({});
  const [screenColor, setScreenColor]= useState('rgb(71, 149, 212)'); 
  const {city, country} = search;
  useEffect(() => {
    const consulWeather = async () => {
      if (consult) {
        const appId = 'ea6e59c68d4f34e0f02be2aa9c6d6be8';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appId}`;

        try {
          const response = await fetch(url);
          const result = await response.json();
          setResult(result);
          setConsult(false);
          //modific the color Screem
          const kelvin = 273.15;
          const { main } = result;
          const current = main.temp - kelvin;
          if (current < 10) {
            setScreenColor('rgb(105, 108 , 129)');
          } else if (current >= 10 && current < 25) {
            console.log('Holaaa');
            setScreenColor('rgb(71, 149, 212)');
          } else {
            setScreenColor('rgb(178, 28 , 61)');
          }
        } catch (error) {
          showAlert();
        }
      }
    };
    consulWeather();
  }, [consult]);

  const showAlert = () => {
    Alert.alert('Error', 'add a city and country to search', [
      {text: 'understood'},
    ]);
  };

  const hideKeyboard = () => {
    Keyboard.dismiss();
  };

  const screemColorApp = {
    backgroundColor: screenColor,
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => hideKeyboard()}>
        <View style={[styles.app, screemColorApp]}>
          <View style={styles.contents}>
            <Weather result={result} />
            <Form
              search={search}
              setSearch={setSearch}
              setConsult={setConsult}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: 'center',
  },
  contents: {
    marginHorizontal: '2.5%',
  },
});

export default App;
