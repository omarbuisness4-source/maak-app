import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ChatFloatingButton() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate("Chat")}
    >
      <Text style={styles.icon}>🤖</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    right: 20,
    bottom: 30,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#ffd166",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },
  icon: {
    fontSize: 34,
  },
});

