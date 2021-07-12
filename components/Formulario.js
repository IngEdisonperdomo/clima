import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  Animated,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const Formulario = ({busqueda, guardarBusqueda, guardarConsultar}) => {
  const [animacionboton] = useState(new Animated.Value(1));

  const {pais, ciudad} = busqueda;

  const animacionEntrada = () => {
    Animated.spring(animacionboton, {
      toValue: 0.75,
    }).start();
  };

  const animacionSalida = () => {
    Animated.spring(animacionboton, {
      toValue: 1,
      friction: 4,
      tension: 30,
    }).start();
  };

  const estiloAnimacion = {
    transform: [{scale: animacionboton}],
  };

  const consultarClima = () => {
    if (pais.trim === '' || ciudad.trim() === '') {
      mostrarAlerta();
      return;
    }
    guardarConsultar(true);
  };

  const mostrarAlerta = () => {
    Alert.alert('Error', 'Agrega una ciudad y país para la busqueda', [
      {text: 'Entendido'},
    ]);
  };

  return (
    <>
      <View style={styles.formulario}>
        <View>
          <TextInput
            value={ciudad}
            placeholder="ciudad"
            placeholderTextColor="#666"
            style={styles.input}
            onChangeText={ciudad => guardarBusqueda({...busqueda, ciudad})}
          />
        </View>
        <View>
          <Picker
            onValueChange={pais => guardarBusqueda({...busqueda, pais})}
            selectedValue={pais}
            mode="dropdown">
            <Picker.Item label="-- Seleccione un país" value="" />
            <Picker.Item label="Estados Unidos" value="US" />
            <Picker.Item label="Mexico" value="MX" />
            <Picker.Item label="Argentina" value="AR" />
            <Picker.Item label="Colombia" value="CO" />
            <Picker.Item label="Costa Rica" value="CR" />
            <Picker.Item label="España" value="ES" />
            <Picker.Item label="Peru" value="PE" />
          </Picker>
        </View>
        <TouchableWithoutFeedback
          onPressIn={() => animacionEntrada()}
          onPressOut={() => animacionSalida()}
          onPress={() => consultarClima()}>
          <Animated.View style={[styles.btnBuscar, estiloAnimacion]}>
            <Text style={styles.textoBuscar}>Buscar Clima</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  formulario: {
    marginTop: 50,
  },
  input: {
    padding: 10,
    height: 50,
    backgroundColor: '#FFF',
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  picker: {
    height: 120,
    backgroundColor: '#FFF',
  },
  btnBuscar: {
    marginTop: 50,
    backgroundColor: '#000',
    padding: 10,
    justifyContent: 'center',
  },
  textoBuscar: {
    color: '#FFF',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default Formulario;
