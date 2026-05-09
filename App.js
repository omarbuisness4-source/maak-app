import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // التعديل هنا

// استدعاء السياق (Context)
import { AccessibilityProvider } from './context/AccessibilityContext';
import { MedicinesProvider } from './context/MedicinesContext';

// استدعاء الشاشات
import HomeScreen from './screens/HomeScreen';
import AddMedicineScreen from './screens/AddMedicineScreen';
import BalanceExercises from './screens/BalanceExercises';
import ChatScreen from './screens/ChatScreen';
import DailyMovement from './screens/DailyMovement';
import HomeSafety from './screens/HomeSafety';
import MedListScreen from './screens/MedListScreen';
import MemoryHub from './screens/MemoryHub';
import RoutineScreen from './screens/RoutineScreen';

const Stack = createNativeStackNavigator(); // التعديل هنا

export default function App() {
  return (
    <MedicinesProvider>
      <AccessibilityProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'الرئيسية', headerShown: false }} />
            <Stack.Screen name="AddMedicine" component={AddMedicineScreen} options={{ title: 'إضافة دواء' }} />
            <Stack.Screen name="Balance" component={BalanceExercises} options={{ title: 'تمارين التوازن' }} />
            <Stack.Screen name="Chat" component={ChatScreen} options={{ title: 'المساعد الذكي' }} />
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
