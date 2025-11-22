import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

type AlbumRowProps = {
  title: string;
  albums: string[]; // later this can be objects with cover art URLs
};

export function AlbumRow({ title, albums }: AlbumRowProps) {
  return (
    <View style={styles.section}>
      {/* Title + chevron */}
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.chevron}>›</Text>
      </View>

      {/* Horizontal album list */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollerContent}
      >
        {albums.map((album, index) => (
          <View key={index} style={styles.albumCard}>
            {/* Placeholder for image */}
            <View style={styles.albumPlaceholder} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "400",
  },
  chevron: {
    color: "#4C5A6A",
    fontSize: 20,
  },
  scrollerContent: {
    paddingRight: 20, // room at end
  },
  albumCard: {
    marginRight: 12,
  },
  albumPlaceholder: {
    width: 118,
    height: 110,
    borderRadius: 3,
    backgroundColor: "#E3E3E3",
  },
});

export default AlbumRow;
