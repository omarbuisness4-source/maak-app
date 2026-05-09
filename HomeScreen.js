import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>تطبيق مَعك</Text>
        <Text style={styles.subtitle}>مرحباً بك، نحن هنا لخدمتك</Text>
      </View>

      <View style={styles.grid}>
        <TouchableOpacity 
          style={styles.card} 
          onPress={() => navigation.navigate('Balance')}
        >
          <Text style={styles.cardIcon}>🧘</Text>
          <Text style={styles.cardText}>تمارين التوازن</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.card} 
          onPress={() => navigation.navigate('MedList')}
        >
          <Text style={styles.cardIcon}>💊</Text>
          <Text style={styles.cardText}>الأدوية</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.card} 
          onPress={() => navigation.navigate('MemoryHub')}
        >
          <Text style={styles.cardIcon}>🧠</Text>
          <Text style={styles.cardText}>مركز الذاكرة</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.card} 
          onPress={() => navigation.navigate('HomeSafety')}
        >
          <Text style={styles.cardIcon}>🏠</Text>
          <Text style={styles.cardText}>سلامة المنزل</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.card} 
          onPress={() => navigation.navigate('DailyMovement')}
        >
          <Text style={styles.cardIcon}>🚶</Text>
          <Text style={styles.cardText}>الحركة اليومية</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.card} 
          onPress={() => navigation.navigate('Routine')}
        >
          <Text style={styles.cardIcon}>📅</Text>
          <Text style={styles.cardText}>الروتين اليومي</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { padding: 40, backgroundColor: '#4A90E2', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
  subtitle: { fontSize: 16, color: '#fff', marginTop: 10 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', padding: 10 },
  card: {
    backgroundColor: '#fff',
    width: '45%',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginVertical: 10,
    elevation: 3,
  },
  cardIcon: { fontSize: 40, marginBottom: 10 },
  cardText: { fontSize: 16, fontWeight: 'bold', color: '#333' }
});
