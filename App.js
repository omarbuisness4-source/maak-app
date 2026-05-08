import React, { useEffect, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

/* Screens */
import HomeScreen from "./screens/HomeScreen";
import ChatScreen from "./screens/ChatScreen";
import MedListScreen from "./screens/MedListScreen";
import AddMedicineScreen from "./screens/AddMedicineScreen";

/* Context */
import { MedicinesProvider } from "./context/MedicinesContext";

// ده المسؤول عن ظهور التنبيه والموبايل مفتوح
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const Stack = createStackNavigator();

export default function App() {
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    async function setupNotifications() {
      // 1. طلب التصاريح
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('يرجى تفعيل صلاحيات التنبيهات من إعدادات الموبايل لكي يعمل المنبه');
        return;
      }

      // 2. إعداد القناة (دي اللي فيها سر الصوت)
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX, // أهم سطر للصوت
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#1e5d4b',
          sound: 'default', 
        });
      }
    }

    setupNotifications();

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log("وصل التنبيه!");
    });

    return () => {
      if (notificationListener.current) notificationListener.current.remove();
    };
  }, []);

  return (
    <MedicinesProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AddMedicine" component={AddMedicineScreen} />
          <Stack.Screen name="MedList" component={MedListScreen} />
          {/* ضيف باقي الشاشات هنا لو لسه موجودة */}
        </Stack.Navigator>
      </NavigationContainer>
    </MedicinesProvider>
  );
}