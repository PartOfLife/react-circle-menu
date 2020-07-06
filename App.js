import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CircleMenu from "./src/components/CircleMenu";

const items = [
  {
    name: "home",
    color: "#298CFF",
  },
  {
    name: "search",
    color: "#30A400",
  },
  {
    name: "map-marker",
    color: "#30A400",
  },
  {
    name: "cog",
    color: "#8A39FF",
  },
];

export default function App() {
  return (
    <View style={styles.container}>
      <CircleMenu items={items} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});
