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
            <Stack.Screen 
              name="Home" 
              component={HomeScreen} 
              options={{ title: 'الرئيسية', headerShown: false }} 
            />
            <Stack.Screen name="AddMedicine" component={AddMedicineScreen} options={{ title: 'إضافة دواء' }} />
            <Stack.Screen name="Balance" component={BalanceExercises} options={{ title: 'تمارين التوازن' }} />
            <Stack.Screen name="DailyMovement" component={DailyMovement} options={{ title: 'الحركة اليومية' }} />
            <Stack.Screen name="HomeSafety" component={HomeSafety} options={{ title: 'سلامة المنزل' }} />
            <Stack.Screen name="MedList" component={MedListScreen} options={{ title: 'قائمة الأدوية' }} />
            <Stack.Screen name="MemoryHub" component={MemoryHub} options={{ title: 'مركز الذاكرة' }} />
            <Stack.Screen name="Routine" component={RoutineScreen} options={{ title: 'الروتين اليومي' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </AccessibilityProvider>
    </MedicinesProvider>
  );
}
