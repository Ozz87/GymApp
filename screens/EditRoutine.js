// EditRoutine.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditRoutine({ route, navigation }) {
  const { routine } = route.params; // Obtén los datos de la rutina desde las props
  const [name, setName] = useState(routine.name);
  const [weight, setWeight] = useState(routine.weight);
  const [reps, setReps] = useState(routine.reps);
  const [sets, setSets] = useState(routine.sets);

  const saveRoutineChanges = async () => {
    const storedRoutines = await AsyncStorage.getItem('routines');
    const currentRoutines = storedRoutines ? JSON.parse(storedRoutines) : [];
    const updatedRoutines = currentRoutines.map((r) =>
      r.id === routine.id
        ? { ...r, name, weight, reps, sets }
        : r
    );
    await AsyncStorage.setItem('routines', JSON.stringify(updatedRoutines));
    navigation.goBack();
  };

  const handleSave = () => {
    Alert.alert(
      "Save Changes",
      "Are you sure you want to save the changes to this routine?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Save", onPress: () => saveRoutineChanges() }
      ]
    );
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text>Edit Exercise Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Enter exercise name"
        style={{ borderWidth: 1, padding: 8, marginBottom: 16 }}
      />
      <Text>Weight (kg)</Text>
      <TextInput
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
        placeholder="Enter weight"
        style={{ borderWidth: 1, padding: 8, marginBottom: 16 }}
      />
      <Text>Reps</Text>
      <TextInput
        value={reps}
        onChangeText={setReps}
        keyboardType="numeric"
        placeholder="Enter reps"
        style={{ borderWidth: 1, padding: 8, marginBottom: 16 }}
      />
      <Text>Sets</Text>
      <TextInput
        value={sets}
        onChangeText={setSets}
        keyboardType="numeric"
        placeholder="Enter sets"
        style={{ borderWidth: 1, padding: 8, marginBottom: 16 }}
      />
      <Button title="Save Changes" onPress={handleSave} />
    </View>
  );
}
