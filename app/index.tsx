import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import HomeScreenHeader from "../components/HomeScreenHeader";
import AlbumRow, { Album } from "../components/ui/AlbumRow";
import FloatingMenu from "../components/ui/FloatingMenu";

const albums: Album[] = [
  {
    id: "dune",
    title: "Dune",
    artist: "Zendaya",
    year: "2025",
    duration: "129 mins",
    description:
      "A moody, cinematic soundscape that blends orchestral textures with synth-driven tension...",
    coverUrl: "https://via.placeholder.com/300x300.png?text=Dune",
  },
  {
    id: "co",
    title: "Channel Orange",
    artist: "Frank Ocean",
    year: "2012",
    coverUrl: "https://via.placeholder.com/300x300.png?text=CO",
  },
  // add more albums…
];

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState("Albums");

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#181B20" }}>
      <HomeScreenHeader activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "Albums" && (
        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 16,
            paddingBottom: 40,
          }}
        >
          <AlbumRow title="What your friends are listening" albums={albums} />
          <AlbumRow title="New Releases" albums={albums} />
          <AlbumRow title="Your next listen" albums={albums} />
        </View>
      )}

      {activeTab === "Activity" && (
        <Text style={{ color: "white", margin: 20 }}>Activity content...</Text>
      )}

      {activeTab === "Lists" && (
        <Text style={{ color: "white", margin: 20 }}>Lists content...</Text>
      )}

      <FloatingMenu
        onProfilePress={() => console.log("Profile pressed")}
        onLogReviewPress={() => console.log("Log/Review pressed")}
        onUsersPress={() => console.log("Users pressed")}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181B20",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120, // extra to avoid overlap with FloatingMenu + bottom tabs
  },
  sections: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  text: {
    color: "white",
    margin: 20,
  },
});
