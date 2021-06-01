import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-community/picker';

const Form = ({search, setSearch, setConsult}) => {
  const {city, country} = search;
  const [animatedbtn] = useState(new Animated.Value(1));

  const consultWeather = () => {
    if (city.trim() === '' || country.trim() === '') {
      showAlert();
      return;
    }
    //consult la api
    setConsult(true);
  };

  const showAlert = () => {
    Alert.alert('Error', 'add a city and country to search', [
      {text: 'understood'},
    ]);
  };
  const animatedIn = () => {
    Animated.spring(animatedbtn, {
      toValue: 0.75,
    }).start();
  };
  const animatedOut = () => {
    Animated.spring(animatedbtn, {
      toValue: 1,
      friction: 4,
      tension: 30,
    }).start();
  };

  const styleAnimated = {
    transform: [
      {
        scale: animatedbtn,
      },
    ],
  };
  return (
    <>
      <View style={styles.form}>
        <View>
          <TextInput
            value={city}
            style={styles.input}
            onChangeText={city => setSearch({...search, city})}
            placeholder="City"
            placeholderTextColor="#666"
          />
        </View>
        <View>
          <Picker
            selectedValue={country}
            itemStyle={{height: 120, backgroundColor: '#FFF'}}
            onValueChange={country => setSearch({...search, country})}>
            <Picker.Item label="-- Select a Country --" value="" />
            <Picker.Item label="United States" value="US" />
            <Picker.Item label="Mexico" value="MX" />
            <Picker.Item label="Argentina" value="AR" />
            <Picker.Item label="Colombia" value="CO" />
            <Picker.Item label="Costa Rica" value="CR" />
            <Picker.Item label="España" value="ES" />
            <Picker.Item label="Peru" value="PE" />
          </Picker>
        </View>
        <TouchableWithoutFeedback
          onPressIn={() => animatedIn()}
          onPressOut={() => animatedOut()}
          onPress={() => consultWeather()}>
          <Animated.View style={[styles.btnSearch, styleAnimated]}>
            <Text style={styles.txtSearch}>Look for the Weather</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  input: {
    padding: 10,
    height: 50,
    backgroundColor: '#FFF',
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  btnSearch: {
    marginTop: 50,
    backgroundColor: '#000',
    padding: 10,
    justifyContent: 'center',
  },
  txtSearch: {
    color: '#FFF',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default Form;
