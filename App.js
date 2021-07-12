import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import axios from 'axios';
import Formulario from './components/Formulario';
import Clima from './components/Clima';

const App = () => {
  const [busqueda, guardarBusqueda] = useState({
    ciudad: '',
    pais: '',
  });

  const [resultado, guardarResultado] = useState({});

  const [consultar, guardarConsultar] = useState(false);

  const [bgColor, guardarBgcolor] = useState('rgb(71,148,212)');

  const {ciudad, pais} = busqueda;

  useEffect(() => {
    const consultarClima = async () => {
      if (consultar) {
        const appId = '797b5f1758eb66374f42bbd17f1a932c';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

        try {
          const respuesta = await fetch(url);
          const resultado = await respuesta.json();
          guardarResultado(resultado);
          guardarConsultar(false);

          const kelvin = 273.15;
          const {main} = resultado;

          const actual = main.temp - kelvin;

          if (actual < 10) {
            guardarBgcolor('rgb(105,108,149)');
          } else if (actual >= 10 && actual < 25) {
            guardarBgcolor('rgb(71,149,212)');
          } else {
            guardarBgcolor('rgb(178,28,61)');
          }
        } catch (e) {
          mostrarAlerta();
        }
      }
    };

    consultarClima();
  }, [consultar]);

  const ocultarTeclado = () => {
    Keyboard.dismiss();
  };

  const mostrarAlerta = () => {
    Alert.alert('Error', 'No hay resultado intenta con otra ciudad o pais', [
      {text: 'ok'},
    ]);
  };

  const bgColorApp = {
    backgroundColor: bgColor,
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => ocultarTeclado()}>
        <View style={[styles.app, bgColorApp]}>
          <View style={styles.contenido}>
            <Clima resultado={resultado} />
            <Formulario
              busqueda={busqueda}
              guardarBusqueda={guardarBusqueda}
              guardarConsultar={guardarConsultar}
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
  contenido: {
    marginHorizontal: '2.5%',
  },
});

export default App;
