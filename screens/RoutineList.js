import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Swipeable } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';

export default function RoutineList({ navigation }) {
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    const fetchRoutines = async () => {
      const storedRoutines = await AsyncStorage.getItem('routines');
      if (storedRoutines) {
        setRoutines(JSON.parse(storedRoutines));
      }
    };

    const focusListener = navigation.addListener('focus', fetchRoutines);
    return focusListener;
  }, [navigation]);

  const deleteRoutine = async (id) => {
    const updatedRoutines = routines.filter((routine) => routine.id !== id);
    setRoutines(updatedRoutines);
    await AsyncStorage.setItem('routines', JSON.stringify(updatedRoutines));
  };

  const renderRightActions = (item) => (
    <>
      <TouchableOpacity
        onPress={() => navigation.navigate('EditRoutine', { routine: item })} // Navega a EditRoutine con los datos de la rutina
        style={styles.editButton}
      >
        <FontAwesome name="edit" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          Alert.alert(
            "Delete Routine",
            "Are you sure you want to delete this routine?",
            [
              { text: "Cancel", style: "cancel" },
              { text: "Delete", onPress: () => deleteRoutine(item.id) }
            ]
          );
        }}
        style={styles.deleteButton}
      >
        <FontAwesome name="trash" size={24} color="white" />
      </TouchableOpacity>
    </>
  );

  const renderRoutine = ({ item }) => (
    <Swipeable renderRightActions={() => renderRightActions(item)}>
      <View style={styles.routineCard}>
        <Text style={styles.routineText}>Exercise: {item.name}</Text>
        <Text style={styles.routineText}>Weight: {item.weight} kg</Text>
        <Text style={styles.routineText}>Reps: {item.reps}</Text>
        <Text style={styles.routineText}>Sets: {item.sets}</Text>
      </View>
    </Swipeable>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddExercise')}>
        <Text style={styles.addButtonText}>Add New Exercise</Text>
      </TouchableOpacity>
      
      {routines.length > 0 ? (
        <FlatList
          data={routines}
          keyExtractor={(item) => item.id}
          renderItem={renderRoutine}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No exercises added yet. Start by adding one!</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f7f7f7',
  },
  addButton: {
    backgroundColor: '#1E90FF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  routineCard: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  routineText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  editButton: {
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
  },
});
