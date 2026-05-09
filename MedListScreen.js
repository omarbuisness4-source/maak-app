import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { MedicinesContext } from "../context/MedicinesContext";

export default function MedListScreen({ navigation }) {
  const { medicines, deleteMedicine, takeDose } =
    useContext(MedicinesContext);

  // تحديد اليوم الحقيقي (السبت = 0)
  const todayIndex = (new Date().getDay() + 1) % 7;


  const days = [
    "السبت",
    "الأحد",
    "الاثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
  ];

  const handleTakeDose = (med) => {
    if (med.takenToday >= med.doses) {
      Alert.alert("تنبيه", "لقد أخذت كل جرعات اليوم بالفعل");
      return;
    }

    takeDose(med.id, todayIndex);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>إدارة الأدوية</Text>

      {medicines.length === 0 && (
        <Text style={styles.empty}>لا يوجد أدوية مضافة</Text>
      )}

      {medicines.map((med) => (
        <View key={med.id} style={styles.card}>
          {/* اسم الدواء + سلة */}
          <View style={styles.headerRow}>
            <Text style={styles.medName}>{med.name}</Text>

            <TouchableOpacity onPress={() => deleteMedicine(med.id)}>
              <Text style={styles.trash}>🗑️</Text>
            </TouchableOpacity>
          </View>

          {/* الجرعات */}
          <Text style={styles.info}>
            الجرعات اليومية: {med.doses}
          </Text>

          <Text style={styles.info}>
            تم أخذ: {med.takenToday} / {med.doses}
          </Text>

          {/* زر أخذ الجرعة */}
          <TouchableOpacity
            style={[
              styles.takeBtn,
              med.takenToday >= med.doses && styles.disabledBtn,
            ]}
            onPress={() => handleTakeDose(med)}
            disabled={med.takenToday >= med.doses}
          >
            <Text style={styles.takeTxt}>أخذت الجرعة</Text>
          </TouchableOpacity>

          {/* جدول الأسبوع */}
          <View style={styles.weekBox}>
            {days.map((day, index) => (
              <View key={index} style={styles.dayRow}>
                <Text style={styles.dayName}>{day}</Text>

                {med.week[index] ? (
                  <Text style={styles.check}>✔</Text>
                ) : (
                  <Text style={styles.emptyCheck}>—</Text>
                )}
              </View>
            ))}
          </View>
        </View>
      ))}

      {/* زر إضافة دواء */}
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => navigation.navigate("AddMedicine")}
      >
        <Text style={styles.addTxt}>＋ إضافة دواء</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: {
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 16,
    textAlign: "center",
  },
  empty: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 40,
  },
  card: {
    backgroundColor: "#edf6f9",
    borderRadius: 18,
    padding: 16,
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  medName: {
    fontSize: 26,
    fontWeight: "800",
  },
  trash: {
    fontSize: 26,
  },
  info: {
    fontSize: 20,
    marginTop: 6,
  },
  takeBtn: {
    backgroundColor: "#0a9396",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 12,
  },
  disabledBtn: {
    backgroundColor: "#aaa",
  },
  takeTxt: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },
  weekBox: {
    marginTop: 16,
  },
  dayRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  dayName: {
    fontSize: 22,
  },
  check: {
    fontSize: 26,
    color: "green",
    fontWeight: "900",
  },
  emptyCheck: {
    fontSize: 22,
    color: "#999",
  },
  addBtn: {
    backgroundColor: "#ffd166",
    padding: 18,
    borderRadius: 18,
    alignItems: "center",
    marginVertical: 30,
  },
  addTxt: {
    fontSize: 24,
    fontWeight: "800",
  },
});

