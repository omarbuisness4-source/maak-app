import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AccessibilityProvider } from './AccessibilityContext'; 
import { MedicinesProvider } from './MedicinesContext';

import HomeScreen from './HomeScreen';
import AddMedicineScreen from './AddMedicineScreen';
import BalanceExercises from './BalanceExercises';
import DailyMovement from './DailyMovement';
import HomeSafety from './HomeSafety';
import MedListScreen from './MedListScreen';
import MemoryHub from './MemoryHub';
import RoutineScreen from './RoutineScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <MedicinesProvider>
      <AccessibilityProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AddMedicine" component={AddMedicineScreen} />
            <Stack.Screen name="Balance" component={BalanceExercises} />
            <Stack.Screen name="DailyMovement" component={DailyMovement} />
            <Stack.Screen name="HomeSafety" component={HomeSafety} />
            <Stack.Screen name="MedList" component={MedListScreen} />
            <Stack.Screen name="MemoryHub" component={MemoryHub} />
            <Stack.Screen name="Routine" component={RoutineScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </AccessibilityProvider>
    </MedicinesProvider>
  );
}
