import React, { useState, useEffect, useRef } from "react";
import {
  View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet,
  KeyboardAvoidingView, Platform, ActivityIndicator
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef(null);

  // مفتاح تخزين جديد لضمان مسح أي كاش قديم
  const STORAGE_KEY = "@chat_offline_v1";

  useEffect(() => { loadMessages(); }, []);
  useEffect(() => { saveMessages(); }, [messages]);

  const saveMessages = async () => {
    try { await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(messages)); } 
    catch (e) { console.log(e); }
  };

  const loadMessages = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) setMessages(JSON.parse(data));
      else setMessages([{
        id: "1",
        text: "أهلاً بك يا حاج 👋 أنا مساعدك الشخصي (معاك). أنا حافظ كل الأدوية المصرية وعارف إزاي أهتم بصحتك. تحب تسأل عن إيه؟",
        user: false,
      }]);
    } catch (e) { console.log(e); }
  };

  // --- موسوعة الأدوية والردود الذكية (Offline Engine) ---
  const getOfflineResponse = (userInput) => {
    const q = userInput.toLowerCase().trim();

    // 1. أدوية الضغط والقلب
    if (q.includes("كونكور") || q.includes("concor") || q.includes("باي الكايبريس") || q.includes("كابوتن") || q.includes("ضغط")) {
      return "بالنسبة لأدوية الضغط زي (الكونكور)، دي مهمة جداً لتنظيم القلب. لازم تتاخد في ميعادها، ولو حسيت بدوخة ارتاح وكلم الدكتور، وممنوع توقفها فجأة.";
    }
    if (q.includes("اكسفورج") || q.includes("exforge") || q.includes("تاريفان")) {
      return "دواء الضغط ده محتاج متابعة وتقلل الملح في أكلك خالص عشان مفعوله يبقى أحسن.";
    }

    // 2. أدوية السكر
    if (q.includes("جلوفاج") || q.includes("سيدوفاج") || q.includes("glucophage") || q.includes("سكر")) {
      return "الجلوفاج (المنظم) يفضل يتاخد وسط الأكل أو بعده عشان ميتعبش معدتك. وطمني سكرك الصايم كام النهاردة؟";
    }
    if (q.includes("أنسولين") || q.includes("لانتوس") || q.includes("نوفرابيد")) {
      return "الأنسولين لازم يتخزن في باب الثلاجة، وتغير مكان الحقن كل يوم عشان الجلد يفضل سليم.";
    }

    // 3. أدوية السيولة والمعدة والمكملات
    if (q.includes("اسبرين") || q.includes("جوسبرين") || q.includes("aspirin")) {
      return "الأسبرين بيحمي من الجلطات. خده بعد الغدا، وطمني لو لاحظت أي علامات زرقاء ظهرت على الجلد.";
    }
    if (q.includes("كونترولوك") || q.includes("controloc") || q.includes("حموضة") || q.includes("معدة")) {
      return "أدوية المعدة زي الكونترولوك يفضل تتاخد على الريق الصبح قبل الفطار بنص ساعة.";
    }
    if (q.includes("ميلجا") || q.includes("نيوروتون") || q.includes("فيتامين") || q.includes("تنميل")) {
      return "دي فيتامينات ب للأعصاب، كويسة جداً عشان التنميل ووجع الرجلين.";
    }

    // 4. الطوارئ
    if (q.includes("تعب") || q.includes("نهجان") || q.includes("صدر") || q.includes("وجع")) {
      return "ألف سلامة عليك! لو فيه ألم في الصدر أو نهجان مش طبيعي، ارتاح فوراً وكلم الدكتور. صحتك أهم حاجة.";
    }

    // 5. التحيات والدردشة
    if (q.includes("ازيك") || q.includes("عامل ايه") || q.includes("اخبارك")) {
      return "أنا بخير طول ما أنت بصحة وعافية يا غالي ❤️. أنا جنبك دايماً لو احتجت تسأل عن علاجك.";
    }
    if (q.includes("صباح الخير")) return "يا صباح الفل والجمال! متنساش كوباية المياه وجرعة علاج الصبح. 🌸";
    if (q.includes("مساء الخير")) return "مساء النور والهنا 🌙. يارب يكون يومك كان هادي، ارتاح ونام كويس.";
    if (q.includes("شكرا") || q.includes("تسلم")) return "الشكر لله يا حاج، ده واجبي. 🌹";
    if (q.includes("انت مين") || q.includes("اسمك")) return "أنا (معاك).. مساعدك الطبي الذكي. حافظ أدوية مصر وموجود عشان أهتم بصحتك.";

    // الرد الافتراضي
    return "فهمت قصدك يا حاج.. أنا عندي معلومات عن أدوية الضغط والسكر والمعدة، تحب تسأل عن دواء معين منهم؟";
  };

  const send = async () => {
    if (!text.trim() || loading) return;
    const userText = text.trim();
    
    // إضافة رسالة المستخدم
    setMessages(prev => [...prev, { id: Date.now().toString(), text: userText, user: true }]);
    setText("");
    setLoading(true);

    // محاكاة تفكير بسيطة عشان يحس إنه ذكي
    setTimeout(() => {
      const response = getOfflineResponse(userText);
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), text: response, user: false }]);
      setLoading(false);
    }, 600);
  };

  const renderItem = ({ item }) => (
    <View style={[styles.msg, item.user ? styles.userMsg : styles.botMsg]}>
      <Text style={[styles.msgText, item.user ? styles.userText : styles.botText]}>{item.text}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>🤝 مساعدك الشخصي (معاك)</Text>
        </View>

        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 15, paddingBottom: 20 }}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />

        {loading && (
          <View style={styles.loader}>
            <ActivityIndicator size="small" color="#4a90e2" />
            <Text style={{ marginLeft: 8, color: "#888", fontSize: 12 }}>بيراجع المعلومات...</Text>
          </View>
        )}

        <View style={styles.inputArea}>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder="اسأل عن دواء (مثل: كونكور)..."
            placeholderTextColor="#999"
            textAlign="right"
          />
          <TouchableOpacity onPress={send} style={styles.sendBtn}>
            <Text style={styles.sendText}>إرسال</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7FB" },
  header: { paddingTop: 50, paddingBottom: 15, backgroundColor: "#FFF", alignItems: "center", elevation: 2 },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#4a90e2" },
  msg: { padding: 12, borderRadius: 20, marginVertical: 5, maxWidth: "85%" },
  userMsg: { backgroundColor: "#4a90e2", alignSelf: "flex-end", borderBottomRightRadius: 2 },
  botMsg: { backgroundColor: "#FFF", alignSelf: "flex-start", borderBottomLeftRadius: 2, elevation: 1 },
  msgText: { fontSize: 16, lineHeight: 22, textAlign: "right" },
  userText: { color: "#FFF" },
  botText: { color: "#333" },
  loader: { flexDirection: "row", alignItems: "center", marginLeft: 20, marginBottom: 10 },
  inputArea: { flexDirection: "row", padding: 10, backgroundColor: "#FFF", borderTopWidth: 1, borderColor: "#EEE", alignItems: "center" },
  input: { flex: 1, backgroundColor: "#F0F2F5", borderRadius: 20, paddingHorizontal: 15, height: 45, fontSize: 15, color: "#000" },
  sendBtn: { marginLeft: 10, backgroundColor: "#4a90e2", borderRadius: 20, width: 70, height: 40, justifyContent: "center", alignItems: "center" },
  sendText: { color: "#FFF", fontWeight: "bold" },
});