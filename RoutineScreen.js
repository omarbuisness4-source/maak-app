import React, { useState, useEffect } from "react"; // ضفنا useEffect هنا
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage"; // ضفنا دي

const ROUTINE = [
  {
    period: "🌅 الصباح",
    tasks: [
      "الاستيقاظ بهدوء",
      "شرب كوب ماء",
      "تناول دواء الصباح",
      "غسل الوجه وتنظيف الأسنان",
      "حركة بسيطة للذراعين",
    ],
  },
  {
    period: "☀️ الظهر",
    tasks: [
      "تناول الغداء",
      "شرب ماء",
      "راحة قصيرة",
      "المشي داخل البيت 5 دقائق",
    ],
  },
  {
    period: "🌇 المساء",
    tasks: [
      "تناول دواء المساء",
      "التواصل مع أحد من العائلة",
      "مشاهدة شيء مريح",
    ],
  },
  {
    period: "🌙 قبل النوم",
    tasks: [
      "الوضوء أو غسل الوجه",
      "التأكد من إغلاق الأنوار",
      "تنفس عميق",
      "النوم مبكرًا",
    ],
  },
];

export default function RoutineScreen() {
  const [done, setDone] = useState({});

  // 1. تحميل المهام اللي خلصت أول ما تفتح الشاشة
  useEffect(() => {
    const loadProgress = async () => {
      try {
        const savedProgress = await AsyncStorage.getItem("@routine_done_key");
        if (savedProgress !== null) {
          setDone(JSON.parse(savedProgress));
        }
      } catch (e) {
        console.log("Error loading progress");
      }
    };
    loadProgress();
  }, []);

  // 2. حفظ المهام كل ما تخلص حاجة جديدة
  const toggleTask = async (key) => {
    const newDone = {
      ...done,
      [key]: true,
    };
    setDone(newDone);
    try {
      await AsyncStorage.setItem("@routine_done_key", JSON.stringify(newDone));
    } catch (e) {
      console.log("Error saving progress");
    }
  };

  const finishDay = async () => {
    Alert.alert(
      "أحسنت 👏",
      "أنهيت روتين اليوم بنجاح. المهام ستتجدد غدًا.",
      [{ text: "تمام" }]
    );
    setDone({});
    await AsyncStorage.removeItem("@routine_done_key"); // نمسح عشان يبدأ يوم جديد
  };

  const today = new Date().toLocaleDateString("ar-EG", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <LinearGradient colors={["#005f73", "#0a9396"]} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}> الروتين اليومي</Text>
          <Text style={styles.sub}>{today}</Text>
        </View>

        {/* Routine */}
        {ROUTINE.map((block, blockIndex) => (
          <View key={blockIndex} style={styles.block}>
            <Text style={styles.period}>{block.period}</Text>

            {block.tasks.map((task, taskIndex) => {
              const key = `${blockIndex}-${taskIndex}`;
              const isDone = done[key];

              return (
                <TouchableOpacity
                  key={key}
                  style={[
                    styles.task,
                    isDone && styles.taskDone,
                  ]}
                  onPress={() => {
                    if (!isDone) toggleTask(key);
                  }}
                  activeOpacity={0.8}
                >
                  <Text style={styles.taskText}>{task}</Text>
                  <Text style={styles.check}>
                    {isDone ? "✔️" : "⭕"}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}

        {/* Finish day */}
        <TouchableOpacity style={styles.finishBtn} onPress={finishDay}>
          <Text style={styles.finishText}>إنهاء يومي بالكامل</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>
          💚 الروتين اليومي يساعد على الاستقرار النفسي وتحسين الذاكرة
        </Text>
      </ScrollView>
    </LinearGradient>
  );
}

// الـ Styles زي ما هي بدون أي تغيير
const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 120 },
  header: { backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 24, padding: 22, marginBottom: 24, alignItems: "center" },
  title: { fontSize: 32, fontWeight: "800", color: "#fff", marginBottom: 6 },
  sub: { fontSize: 20, color: "#e0fbfc", fontWeight: "600" },
  block: { marginBottom: 26 },
  period: { fontSize: 26, fontWeight: "800", color: "#fff", marginBottom: 12 },
  task: { backgroundColor: "#edf6f9", borderRadius: 18, padding: 18, marginBottom: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  taskDone: { backgroundColor: "#caffbf" },
  taskText: { fontSize: 22, fontWeight: "700", color: "#003049", width: "85%" },
  check: { fontSize: 28 },
  finishBtn: { backgroundColor: "#ffd166", paddingVertical: 20, borderRadius: 24, alignItems: "center", marginTop: 20 },
  finishText: { fontSize: 26, fontWeight: "800", color: "#003049" },
  footer: { marginTop: 18, fontSize: 18, color: "#fff", textAlign: "center", lineHeight: 26, fontWeight: "600" },
});