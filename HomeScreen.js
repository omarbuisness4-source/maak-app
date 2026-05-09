import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeScreen({ navigation }) {
  const [challenge, setChallenge] = useState("memory");

  const memoryServices = [
    {
      title: "إدارة الأدوية",
      desc: "جرعات – مواعيد – متابعة",
      emoji: "💊",
      onPress: () => navigation.navigate("MedList"),
    },
    {
      title: "روتين يومي ثابت",
      desc: "تنظيم اليوم",
      emoji: "📅",
      onPress: () => navigation.navigate("Routine"),
    },
    {
      title: "فيديوهات تنشيط الذاكرة",
      desc: "محتوى بسيط",
      emoji: "🎥",
      onPress: () => navigation.navigate("MemoryHub"),
    },
  ];

  const fallServices = [
    {
      title: "تمارين توازن",
      desc: "تقليل السقوط",
      emoji: "🚶‍♂️",
      // تم التعديل هنا ليطابق الاسم في App.js
      onPress: () => navigation.navigate("Balance"), 
    },
    {
      title: "أمان المنزل",
      desc: "إرشادات مهمة",
      emoji: "🏠",
      onPress: () => navigation.navigate("HomeSafety"),
    },
  ];

  const services = challenge === "memory" ? memoryServices : fallServices;

  return (
    <LinearGradient colors={["#0a9396", "#005f73"]} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* العنوان */}
        <View style={styles.headerBox}>
          <Text style={styles.title}>معاك</Text>
          <Text style={styles.subTitle}>كبار السن</Text>
        </View>

        {/* التحدي */}
        <Text style={styles.section}>التحدي</Text>
        <View style={styles.row}>
          <TouchableOpacity
            style={[
              styles.challengeBtn,
              challenge === "memory" && styles.activeBtn,
            ]}
            onPress={() => setChallenge("memory")}
          >
            <Text style={styles.challengeText}>🧠 ضعف الذاكرة</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.challengeBtn,
              challenge === "fall" && styles.activeBtn,
            ]}
            onPress={() => setChallenge("fall")}
          >
            <Text style={styles.challengeText}>🚶 خطر السقوط</Text>
          </TouchableOpacity>
        </View>

        {/* الخدمات */}
        <Text style={styles.section}>الخدمات</Text>

        {services.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={item.onPress}
          >
            <Text style={styles.cardEmoji}>{item.emoji}</Text>
            <View>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDesc}>{item.desc}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 80,
  },
  headerBox: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 34,
    color: "#fff",
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 22,
    color: "#e0fbfc",
  },
  section: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    marginBottom: 20,
  },
  challengeBtn: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.25)",
    padding: 16,
    borderRadius: 18,
    marginRight: 10,
    alignItems: "center",
  },
  activeBtn: {
    backgroundColor: "#ffd166",
  },
  challengeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#003049",
  },
  card: {
    backgroundColor: "#edf6f9",
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  cardEmoji: {
    fontSize: 40,
    marginRight: 16,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#003049",
  },
  cardDesc: {
    fontSize: 16,
    color: "#555",
  },
});
