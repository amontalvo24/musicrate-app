import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import HomeScreenHeader from "../components/HomeScreenHeader";
import AlbumRow from "../components/ui/AlbumRow";
import FloatingMenu from "../components/ui/FloatingMenu";



export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState("Albums");
  
   const albums = ["A", "B", "C", "D", "E"];

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
      >
        <HomeScreenHeader activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === "Albums" && (
          <View style={styles.sections}>
            <AlbumRow title="What your friends are listening" albums={albums} />
            <AlbumRow title="New Releases" albums={albums} />
            <AlbumRow title="Your next listen" albums={albums} />
          </View>
        )}

        {activeTab === "Activity" && (
          <Text style={styles.text}>Activity content...</Text>
        )}

        {activeTab === "Lists" && (
          <Text style={styles.text}>Lists content...</Text>
        )}
      </ScrollView>

      {/* Floating menu stays above everything */}
      <FloatingMenu
        onLogReviewPress={() => console.log("Log/Review pressed")}
        onUsersPress={() => console.log("Users pressed")}
        onProfilePress={() => console.log("Profile pressed")}

      />
    </View>
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
    paddingBottom: 120,   // extra to avoid overlap with FloatingMenu + bottom tabs
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
