import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
const Weather = ({result}) => {
  const {name, main} = result;
  if (!name) {
    return null;
  }

  // grado kelvin
  const kelvin = 273.15;

  console.log(result);
  return (
    <>
      <View style={styles.weather}>
        <Text style={[styles.txt, styles.current]}>
          {parseInt(main.temp - kelvin)}
          <Text style={styles.temp}>&#x2103;</Text>
          <Image
            style={{width: 66, height: 58}}
            source={{
              uri: `http://openweathermap.org/img/w/${result.weather[0].icon}.png`,
            }}
          />
        </Text>
        <View style={styles.temperatures}> 
            <Text style={styles.txt}> Min {' '}
                <Text style={styles.temp}>
                    {parseInt(main.temp_min -kelvin)} &#x2103;
                </Text>
            </Text>

            <Text style={styles.txt}>Max {' '}
                <Text style={styles.temp}>
                    {parseInt(main.temp_max -kelvin)} &#x2103;
                </Text>
            </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  weather: {
    marginBottom: 20,
  },
  txt: {
    color: '#FFF',
    fontSize: 20,
    textAlign: 'center',
    marginRight: 20,
  },
  current: {
    fontSize: 80,
    marginRight: 0,
    fontWeight: 'bold',
  },
  temp: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  temperatures: {
      flexDirection: 'row',
      justifyContent: 'center',
  }
});

export default Weather;
