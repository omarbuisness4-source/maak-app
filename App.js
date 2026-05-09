import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// استدعاء السياق مباشرة من الصفحة الرئيسية للمستودع
import { AccessibilityProvider } from './AccessibilityContext'; 
import { MedicinesProvider } from './MedicinesContext';

// استدعاء كل الشاشات مباشرة من الصفحة الرئيسية للمستودع
import HomeScreen from './HomeScreen';
import AddMedicineScreen from './AddMedicineScreen';
import BalanceExercises from './BalanceExercises';
import ChatScreen from './ChatScreen';
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
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'الرئيسية', headerShown: false }} />
            <Stack.Screen name="AddMedicine" component={AddMedicineScreen} options={{ title: 'Add Medicine' }} />
            <Stack.Screen name="Balance" component={BalanceExercises} options={{ title: 'Balance Exercises' }} />
            <Stack.Screen name="Chat" component={ChatScreen} options={{ title: 'AI Assistant' }} />
            <Stack.Screen name="DailyMovement" component={DailyMovement} options={{ title: 'Daily Movement' }} />
            <Stack.Screen name="HomeSafety" component={HomeSafety} options={{ title: 'Home Safety' }} />
            <Stack.Screen name="MedList" component={MedListScreen} options={{ title: 'Medicine List' }} />
            <Stack.Screen name="MemoryHub" component={MemoryHub} options={{ title: 'Memory Hub' }} />
            <Stack.Screen name="Routine" component={RoutineScreen} options={{ title: 'Daily Routine' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </AccessibilityProvider>
    </MedicinesProvider>
  );
}
