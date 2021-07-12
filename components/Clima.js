import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const Clima = ({resultado}) => {
  const {main, name} = resultado;

  if (!name) {
    return null;
  }

  const kelvin = 273.15;

  return (
    <View style={styles.clima}>
      <Text style={[styles.texto, styles.actual]}>
        {parseInt(main.temp - kelvin)}
        <Text style={styles.temperatura}>&#x2103;</Text>
        <Image
          style={styles.image}
          source={{
            uri: `http://api.openweathermap.org/img/w/${resultado.weather[0].icon}.png`,
          }}
        />
      </Text>

      <View style={styles.temperaturas}>
        <Text style={styles.texto}>
          {' '}
          Min{' '}
          <Text style={styles.temperatura}>
            {parseInt(main.temp_min - kelvin)} &#x2103;
          </Text>
        </Text>
        <Text style={styles.texto}>
          {' '}
          Max{' '}
          <Text style={styles.temperatura}>
            {parseInt(main.temp_max - kelvin)} &#x2103;
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  clima: {
    marginBottom: 20,
  },
  texto: {
    color: '#FFF',
    fontSize: 20,
    textAlign: 'center',
    marginRight: 20,
  },
  actual: {
    fontSize: 80,
    marginRight: 0,
    fontWeight: 'bold',
  },
  temperatura: {
    fontSize: 24,
    fontWeight: 'normal',
  },
  image: {
    width: 68,
    height: 58,
  },
  temperaturas: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default Clima;
