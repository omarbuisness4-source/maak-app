import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { WebView } from "react-native-webview";

const YOUTUBE_KEY = "AIzaSyAly-m0_ZRxyuK7juDPo5iee79OfnJqPSM";

function buildArabicQuery(disability) {
  if (disability === "elder")
    return "تمارين تنشيط الذاكرة لكبار السن";
  if (disability === "mental")
    return "تمارين تهدئة القلق";
  if (disability === "autism")
    return "فيديوهات تهدئة للتوحد";
  return "تمارين استرخاء";
}

export default function MemoryHubScreen({ route }) {
  const { disability = "elder" } = route.params || {};

  const [videos, setVideos] = useState([]);
  const [pageToken, setPageToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [playingId, setPlayingId] = useState(null);

  useEffect(() => {
    loadVideos(true);
  }, [disability]);

  async function loadVideos(reset = false) {
    if (loading) return;
    setLoading(true);

    const url =
      `https://www.googleapis.com/youtube/v3/search` +
      `?part=snippet&type=video&maxResults=15` +
      `&relevanceLanguage=ar` +
      `&q=${encodeURIComponent(buildArabicQuery(disability))}` +
      (pageToken && !reset ? `&pageToken=${pageToken}` : "") +
      `&key=${YOUTUBE_KEY}`;

    const res = await fetch(url);
    const json = await res.json();

    const newVideos = (json.items || []).map((v) => ({
      id: v.id.videoId,
      title: v.snippet.title,
      thumb: `https://img.youtube.com/vi/${v.id.videoId}/hqdefault.jpg`,
    }));

    setVideos((prev) => (reset ? newVideos : [...prev, ...newVideos]));
    setPageToken(json.nextPageToken || null);
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>فيديوهات عربية مناسبة لك</Text>
      <Text style={styles.sub}>اضغط على الفيديو للتشغيل</Text>

      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        onEndReached={() => loadVideos()}
        onEndReachedThreshold={0.6}
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.videoTitle}>{item.title}</Text>

            {playingId === item.id ? (
              <WebView
                style={styles.video}
                javaScriptEnabled
                source={{
                  uri: `https://www.youtube.com/embed/${item.id}`,
                }}
              />
            ) : (
              <TouchableOpacity
                onPress={() => setPlayingId(item.id)}
                activeOpacity={0.8}
              >
                <Image source={{ uri: item.thumb }} style={styles.thumbnail} />
                <View style={styles.playOverlay}>
                  <Text style={styles.playIcon}>▶</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </View>
  );
}

/* ===== الشكل ===== */
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold" },
  sub: { color: "#555", marginBottom: 12 },

  card: {
    backgroundColor: "#f1f5f9",
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  videoTitle: { fontWeight: "700", marginBottom: 8 },

  thumbnail: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  playOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  playIcon: {
    fontSize: 60,
    color: "#fff",
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 50,
    paddingHorizontal: 20,
  },
  video: { width: "100%", height: 220 },
});



