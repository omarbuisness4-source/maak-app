import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeSafety() {
  const tips = [
    {
      emoji: "💡",
      title: "إضاءة قوية",
      desc: "خلي الإضاءة واضحة في كل البيت، خصوصًا الممرات والحمّام."
    },
    {
      emoji: "🧹",
      title: "أرضية آمنة",
      desc: "شيل السجاد المتحرك وأي حاجة ممكن تزحلق."
    },
    {
      emoji: "🚿",
      title: "حمّام آمن",
      desc: "ما تمشيش على أرضية مبلولة، وركّب مقابض مساعدة."
    },
    {
      emoji: "👟",
      title: "حذاء ثابت",
      desc: "البس شبشب أو حذاء مريح وماشي بثبات."
    },
    {
      emoji: "🪑",
      title: "كراسي ثابتة",
      desc: "اقعد على كراسي تقيلة ومتقفش على ترابيزة."
    },
    {
      emoji: "📞",
      title: "تليفون قريب",
      desc: "خلي التليفون جنبك دايمًا في أي مكان."
    },
  ];

  return (
    <LinearGradient colors={["#0a9396", "#005f73"]} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* Header Glass */}
        <View style={styles.headerGlass}>
          <Text style={styles.title}>🏠 أمان المنزل</Text>
          <Text style={styles.subTitle}>
            خطوات بسيطة تحميك من خطر السقوط
          </Text>
        </View>

        {/* Tips */}
        {tips.map((tip, index) => (
          <View key={index} style={styles.cardGlass}>
            <View style={styles.iconCircle}>
              <Text style={styles.emoji}>{tip.emoji}</Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{tip.title}</Text>
              <Text style={styles.cardDesc}>{tip.desc}</Text>
            </View>
          </View>
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

  /* Header */
  headerGlass: {
    backgroundColor: "rgba(255,255,255,0.18)",
    borderRadius: 24,
    padding: 22,
    marginBottom: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 34,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 6,
  },
  subTitle: {
    fontSize: 20,
    color: "#e0fbfc",
    textAlign: "center",
  },

  /* Card */
  cardGlass: {
    backgroundColor: "rgba(255,255,255,0.85)",
    borderRadius: 22,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#0a9396",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },

  emoji: {
    fontSize: 34,
  },

  cardTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#003049",
    marginBottom: 4,
  },

  cardDesc: {
    fontSize: 18,
    color: "#444",
    lineHeight: 26,
  },
});
