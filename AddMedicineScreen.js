import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";

// استيراد الـ Context الخاص بالأدوية
import { MedicinesContext } from "../context/MedicinesContext";

export default function AddMedicineScreen({ navigation }) {
  // سحب فانكشن إضافة الدواء من الـ Context
  const { addMedicine } = useContext(MedicinesContext);

  const [name, setName] = useState("");
  const [doses, setDoses] = useState("1");
  const [times, setTimes] = useState([new Date()]);
  const [showPicker, setShowPicker] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const addTimeSlot = () => {
    setTimes([...times, new Date()]);
  };

  const onTimeChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      const newTimes = [...times];
      newTimes[currentIndex] = selectedDate;
      setTimes(newTimes);
    }
  };

  const save = () => {
    if (!name.trim()) {
      Alert.alert("تنبيه", "برجاء كتابة اسم الدواء");
      return;
    }

    // حفظ الدواء في التطبيق
    addMedicine({
      id: Date.now().toString(),
      name: name.trim(),
      doses: doses,
      times: times.map((t) =>
        t.toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })
      ),
      takenToday: 0,
      week: Array(7).fill(false),
    });

    Alert.alert("تم", "تم حفظ الدواء بنجاح");
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-forward" size={28} color="#1e5d4b" />
        </TouchableOpacity>
        <Text style={styles.title}>إضافة دواء جديد</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>اسم الدواء</Text>
        <TextInput
          style={styles.input}
          placeholder="مثلاً: بنادول"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>عدد الجرعات يومياً</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={doses}
          onChangeText={setDoses}
        />

        <Text style={styles.label}>مواعيد الجرعات</Text>
        {times.map((time, index) => (
          <TouchableOpacity
            key={index}
            style={styles.timeButton}
            onPress={() => {
              setCurrentIndex(index);
              setShowPicker(true);
            }}
          >
            <Ionicons name="time-outline" size={20} color="#1e5d4b" />
            <Text style={styles.timeText}>
              الجرعة {index + 1}: {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.addTimeBtn} onPress={addTimeSlot}>
          <Text style={styles.addTimeBtnText}>+ إضافة موعد آخر</Text>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={times[currentIndex]}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={onTimeChange}
          />
        )}

        <TouchableOpacity style={styles.saveButton} onPress={save}>
          <Text style={styles.saveButtonText}>حفظ الدواء</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row-reverse",
    alignItems: "center",
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#f8f9fa",
  },
  title: { fontSize: 22, fontWeight: "bold", color: "#1e5d4b", marginRight: 15 },
  inputContainer: { padding: 20 },
  label: { fontSize: 16, fontWeight: "600", color: "#333", marginBottom: 8, marginTop: 15, textAlign: 'right' },
  input: {
    backgroundColor: "#f1f3f5",
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    textAlign: "right",
  },
  timeButton: {
    flexDirection: "row-reverse",
    alignItems: "center",
    backgroundColor: "#e7f5f1",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  timeText: { marginRight: 10, color: "#1e5d4b", fontWeight: "bold" },
  addTimeBtn: { marginTop: 5, marginBottom: 20 },
  addTimeBtnText: { color: "#1e5d4b", fontWeight: "bold", textAlign: "right" },
  saveButton: {
    backgroundColor: "#1e5d4b",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 30,
  },
  saveButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});