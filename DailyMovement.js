import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function DailyMovement() {
  const moves = [
    {
      title: "تحريك الذراعين",
      desc: "ارفع ذراعيك للأعلى ثم أنزلهم ببطء – 10 مرات",
      emoji: "🙆‍♂️",
    },
    {
      title: "تحريك الرقبة",
      desc: "لف رقبتك يمين وشمال ببطء وأنت جالس",
      emoji: "🔄",
    },
    {
      title: "المشي في المكان",
      desc: "امشِ في مكانك لمدة دقيقة",
      emoji: "🚶",
    },
  ];

  return (
    <LinearGradient colors={["#0a9396", "#005f73"]} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>⏱️ حركة خفيفة</Text>
        <Text style={styles.sub}>
          نشاط بسيط للحفاظ على الحركة والنشاط
        </Text>

        {moves.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.emoji}>{item.emoji}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDesc}>{item.desc}</Text>
            </View>
          </View>
        ))}

        <Text style={styles.note}>
          💙 الحركة البسيطة يوميًا أفضل من المجهود الشديد
        </Text>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 60 },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  sub: {
    fontSize: 20,
    color: "#e0fbfc",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#edf6f9",
    borderRadius: 20,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  emoji: { fontSize: 40, marginRight: 16 },
  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#003049",
  },
  cardDesc: {
    fontSize: 18,
    color: "#555",
    marginTop: 4,
  },
  note: {
    fontSize: 18,
    color: "#fff",
    marginTop: 20,
    textAlign: "center",
  },
});


