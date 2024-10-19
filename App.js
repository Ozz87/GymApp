import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RoutineList from './screens/RoutineList';
import AddExercise from './screens/AddExercise';
import EditRoutine from './screens/EditRoutine'; 

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="RoutineList"
          component={RoutineList}
          options={{ title: 'My Gym Routines' }}
        />
        <Stack.Screen
          name="AddExercise"
          component={AddExercise}
          options={{ title: 'Add Exercise' }}
        />
        {/* Agrega la pantalla EditRoutine aquí */}
        <Stack.Screen
          name="EditRoutine"
          component={EditRoutine}
          options={{ title: 'Edit Routine' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
