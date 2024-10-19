import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddExercise({ navigation }) {
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [sets, setSets] = useState('');
  const [rpe, setRpe] = useState(''); 

  const handleSave = async () => {
    // Validaciones simples
    if (!name || !weight || !reps || !sets || !rpe) {
      Alert.alert('Error', 'All fields must be filled.');
      return;
    }

    if (isNaN(weight) || isNaN(reps) || isNaN(sets) || isNaN(rpe)) {
      Alert.alert('Error', 'Please enter valid numbers.');
      return;
    }

    const newExercise = {
      id: Date.now().toString(),
      name,
      weight,
      reps,
      sets,
      rpe, 
    };

    const storedRoutines = await AsyncStorage.getItem('routines');
    const currentRoutines = storedRoutines ? JSON.parse(storedRoutines) : [];
    currentRoutines.push(newExercise);
    await AsyncStorage.setItem('routines', JSON.stringify(currentRoutines));

    navigation.goBack(); 
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Exercise</Text>
      </TouchableOpacity>

      {/* Inputs de los datos del ejercicio */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Exercise Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Enter exercise name"
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Weight (kg)</Text>
        <TextInput
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
          placeholder="Enter weight"
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Reps</Text>
        <TextInput
          value={reps}
          onChangeText={setReps}
          keyboardType="numeric"
          placeholder="Enter reps"
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Sets</Text>
        <TextInput
          value={sets}
          onChangeText={setSets}
          keyboardType="numeric"
          placeholder="Enter sets"
          style={styles.input}
        />
      </View>
      {/* Campo de entrada para RPE  . no lo puedo hacer funcionar*/}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>RPE (1-10)</Text>
        <TextInput
          value={rpe}
          onChangeText={setRpe}
          keyboardType="numeric"
          placeholder="Enter RPE"
          style={styles.input}
        />
      </View>

      {/* Imagen en la parte inferior */}
      <Image
        source={require('../assets/exercise.jpg')} 
        style={styles.image}
        resizeMode="contain" 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f2f2f2',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  saveButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  image: {
    width: '300%',
    height: 200,
    alignSelf: 'center',
    marginTop: 22,
  },
});
