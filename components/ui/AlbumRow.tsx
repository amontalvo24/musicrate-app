// components/ui/AlbumRow.tsx
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export type Album = {
  id: string;
  title: string;
  artist: string;
  year: string;
  duration?: string;
  coverUrl?: string;
  description?: string;
};

type AlbumRowProps = {
  title: string;
  albums: Album[];
};

export default function AlbumRow({ title, albums }: AlbumRowProps) {
  const router = useRouter();

  return (
    <View style={styles.section}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {albums.map((album) => (
          <Pressable
            key={album.id}
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/album/[albumId]",
                params: {
                  albumId: album.id,
                  title: album.title,
                  artist: album.artist,
                  year: album.year,
                  duration: album.duration ?? "",
                  description: album.description ?? "",
                  coverUrl: album.coverUrl ?? "",
                },
              })
            }
          >
            <Image
              source={{
                uri:
                  album.coverUrl ??
                  "https://via.placeholder.com/150x150.png?text=Album",
              }}
              style={styles.cover}
            />
            <Text style={styles.albumTitle} numberOfLines={1}>
              {album.title}
            </Text>
            <Text style={styles.albumArtist} numberOfLines={1}>
              {album.artist}
            </Text>
          </Pressable>
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
    marginBottom: 8,
    paddingRight: 4,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  scrollContent: {
    paddingVertical: 4,
  },
  card: {
    width: 118,
    marginRight: 12,
  },
  cover: {
    width: 118,
    height: 118,
    borderRadius: 3,
    backgroundColor: "#333",
    marginBottom: 6,
  },
  albumTitle: {
    color: "#FFFFFF",
    fontSize: 13,
  },
  albumArtist: {
    color: "#9EABBB",
    fontSize: 12,
  },
});
