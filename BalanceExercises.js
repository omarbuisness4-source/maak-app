import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function BalanceExercises() {
  const exercises = [
    {
      level: "المرحلة الأولى (وأنت جالس)",
      emoji: "🪑",
      items: [
        {
          title: "تحريك القدمين",
          desc: "ارفع قدمك للأمام ثم أنزلها ببطء – 10 مرات لكل قدم",
          emoji: "👣",
        },
        {
          title: "تحريك الكاحل",
          desc: "لف الكاحل في دايرة صغيرة – 10 مرات",
          emoji: "🔄",
        },
      ],
    },
    {
      level: "المرحلة الثانية (الوقوف الآمن)",
      emoji: "🧍‍♂️",
      items: [
        {
          title: "الوقوف مع مسند",
          desc: "قف مع مسك كرسي أو حائط لمدة 20 ثانية",
          emoji: "✋",
        },
        {
          title: "نقل الوزن",
          desc: "انقل وزنك من قدم للأخرى ببطء – 10 مرات",
          emoji: "⚖️",
        },
      ],
    },
    {
      level: "المرحلة الثالثة (تنشيط التوازن)",
      emoji: "🚶‍♂️",
      items: [
        {
          title: "خطوة للأمام",
          desc: "خد خطوة صغيرة للأمام ثم ارجع – 5 مرات",
          emoji: "➡️",
        },
        {
          title: "المشي في المكان",
          desc: "امشِ في مكانك لمدة دقيقة",
          emoji: "⏱️",
        },
      ],
    },
  ];

  return (
    <LinearGradient colors={["#0a9396", "#005f73"]} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* العنوان */}
        <Text style={styles.title}>🚶‍♂️ تمارين التوازن</Text>
        <Text style={styles.sub}>
          برنامج آمن لتقليل خطر السقوط وتقوية الثبات
        </Text>

        {/* التمارين */}
        {exercises.map((section, index) => (
          <View key={index} style={styles.sectionBox}>
            <Text style={styles.level}>
              {section.emoji} {section.level}
            </Text>

            {section.items.map((item, i) => (
              <View key={i} style={styles.card}>
                <Text style={styles.cardEmoji}>{item.emoji}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardDesc}>{item.desc}</Text>
                </View>
              </View>
            ))}
          </View>
        ))}

        {/* تحذير */}
        <View style={styles.warningBox}>
          <Text style={styles.warningText}>
            ⚠️ مهم جدًا:
            {"\n"}• خلي في مسند قريب منك
            {"\n"}• لو حسيت بدوخة أو تعب وقف فورًا
            {"\n"}• مفيش أي تمرين لازم يسبب ألم
          </Text>
        </View>

        {/* رسالة تشجيع */}
        <Text style={styles.footer}>
          💙 الاستمرار على التمارين البسيطة بيقلل خطر السقوط بشكل كبير
        </Text>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 70 },

  title: {
    fontSize: 34,
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

  sectionBox: {
    marginBottom: 18,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 18,
    padding: 14,
  },
  level: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },

  card: {
    backgroundColor: "#edf6f9",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  cardEmoji: { fontSize: 38, marginRight: 14 },
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

  warningBox: {
    backgroundColor: "#ffd166",
    borderRadius: 16,
    padding: 16,
    marginTop: 10,
  },
  warningText: {
    fontSize: 18,
    color: "#003049",
    fontWeight: "700",
    lineHeight: 26,
  },

  footer: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    marginTop: 18,
    fontWeight: "600",
  },
});
