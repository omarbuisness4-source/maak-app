import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler'; // حل مشكلة الـ Missing Peer Dependency

// شاشات بسيطة جوه نفس الملف عشان نتخطى خطأ الـ "Module not found"
const HomeScreen = () => (
  <View style={styles.container}><Text style={styles.text}>مرحباً بك في معاك (Home)</Text></View>
);
const ChatScreen = () => (
  <View style={styles.container}><Text style={styles.text}>شاشة الدردشة</Text></View>
);
const MedListScreen = () => (
  <View style={styles.container}><Text style={styles.text}>قائمة الأدوية</Text></View>
);

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'الرئيسية' }} />
        <Stack.Screen name="Chat" component={ChatScreen} options={{ title: 'الدردشة' }} />
        <Stack.Screen name="MedList" component={MedListScreen} options={{ title: 'الأدوية' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0a9396' },
  text: { color: 'white', fontSize: 20, fontWeight: 'bold' }
});
