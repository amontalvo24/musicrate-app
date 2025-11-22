import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import HomeScreenHeader from "../../components/HomeScreenHeader";
import AlbumRow from "../../components/ui/AlbumRow";

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState("Albums");
  
   const albums = ["A", "B", "C", "D", "E"];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#181B20" }}>
      <HomeScreenHeader activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "Albums" && (
        <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 40 }}>
          {/* Section 1 */}
          <AlbumRow
            title="What your friends are listening"
            albums={albums}
          />

          {/* Section 2 */}
          <AlbumRow title="New Releases" albums={albums} />

          {/* Section 3 */}
          <AlbumRow title="Your next listen" albums={albums} />
        </View>
      )}

      {activeTab === "Activity" && (
        <Text style={{ color: "white", margin: 20 }}>Activity content...</Text>
      )}

      {activeTab === "Lists" && (
        <Text style={{ color: "white", margin: 20 }}>Lists content...</Text>
      )}
    </ScrollView>
  );
}