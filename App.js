import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Home', headerShown: false }} 
        />
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
  );
}
