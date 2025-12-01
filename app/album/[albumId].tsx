import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  LayoutAnimation,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  UIManager,
  View,
} from "react-native";

const TABS = ["Tracks", "Credits", "Details", "Genres"] as const;

const MAX_DESCRIPTION_CHARS = 200;

type TabKey = (typeof TABS)[number];

// Enable LayoutAnimation on Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function AlbumDetails() {
  const [activeTab, setActiveTab] = useState<TabKey>("Tracks");
  const [showFullDescription, setShowFullDescription] = useState(false);

  // later you’ll get these from your API / navigation params
  const albumTitle = "Dune";
  const artistName = "Zendaya";
  const year = "2025";
  const duration = "129 mins";
  const description =
    "(If any) Description... This is where you can show a summary, review blurb, or editorial description for the album. Make this long enough to trigger truncation so we can test the three-dot expand behavior and see the layout slide smoothly.";

  const hasLongDescription = description.length > 160; // tweak threshold

  const handleExpandDescription = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowFullDescription(true); // one-way expand
  };

  return (
    
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {/* TOP BAR */}
      <View style={styles.topBar}>
        <Pressable style={styles.iconButton}>
          <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
        </Pressable>

        <View style={{ flexDirection: "row", gap: 12 }}>
          <Pressable style={styles.iconButton}>
            <MaterialCommunityIcons
              name="dots-vertical"
              size={22}
              color="#FFFFFF"
            />
          </Pressable>
        </View>
      </View>

      {/* TITLE + META + COVER */}
      <View style={styles.headerRow}>
        <View style={{ flex: 1, paddingRight: 16 }}>
          <Text style={styles.title}>{albumTitle}</Text>

          <Text style={styles.metaText}>
            {year} · BY <Text style={styles.metaArtist}>{artistName}</Text>
          </Text>

          <Text style={styles.metaText}>{duration}</Text>
        </View>

        {/* Album art – placeholder for now */}
        <View style={styles.coverWrapper}>
          <Image
            source={{
              uri: "https://via.placeholder.com/300x300.png?text=Album+Art",
            }}
            style={styles.coverImage}
          />
        </View>
      </View>

      {/* DESCRIPTION + "..." BUTTON */}
      <View style={styles.descriptionBox}>
          <Text
            style={styles.descriptionText}
            numberOfLines={
              !showFullDescription && hasLongDescription ? 3 : undefined
            }
          >
            {description}
          </Text>

          {hasLongDescription && !showFullDescription && (
            <Pressable
              style={styles.moreDescriptionButton}
              onPress={handleExpandDescription}
            >
              <MaterialCommunityIcons
                name="dots-horizontal"
                size={20}
                color="#FFFFFF"
              />
            </Pressable>
          )}
      </View>

      {/* STATS CARDS: listeners / reviews / lists */}
      <View style={styles.statsRow}>
        <StatCard
          color="#00B021"
          icon={
            <Ionicons name="headset-outline" size={22} color="#FFFFFF" />
          }
          label="Listeners"
          value="2.16m"
        />
        <StatCard
          color="#778898"
          icon={
            <MaterialCommunityIcons
              name="file-document-outline"
              size={22}
              color="#FFFFFF"
            />
          }
          label="Reviews"
          value="2.16m"
        />
        <StatCard
          color="#1E9DD4"
          icon={
            <MaterialCommunityIcons
              name="content-copy"
              size={22}
              color="#FFFFFF"
            />
          }
          label="Lists"
          value="2.16m"
        />
      </View>

      {/* TABS: Tracks / Credits / Details / Genres */}
      <View style={styles.tabsRow}>
        {TABS.map((tab) => {
          const isActive = tab === activeTab;
          return (
            <Pressable
              key={tab}
              style={styles.tabItem}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[styles.tabLabel, isActive && styles.tabLabelActive]}
              >
                {tab}
              </Text>
              {isActive && <View style={styles.tabIndicator} />}
            </Pressable>
          );
        })}
      </View>

      {/* TAB CONTENT */}
      <View style={styles.tabContent}>
        {activeTab === "Tracks" && (
          <>
            <Text style={styles.sectionTitle}>Tracks</Text>
            <TrackRow index={1} title="Intro" duration="1:23" />
            <TrackRow index={2} title="Desert Walk" duration="3:47" />
            <TrackRow index={3} title="Sandstorm" duration="4:12" />
          </>
        )}

        {activeTab === "Credits" && (
          <>
            <Text style={styles.sectionTitle}>Credits</Text>
            <Text style={styles.bodyText}>Producer: Someone</Text>
            <Text style={styles.bodyText}>Label: Some Label</Text>
          </>
        )}

        {activeTab === "Details" && (
          <>
            <Text style={styles.sectionTitle}>Details</Text>
            <Text style={styles.bodyText}>Format: Digital / Vinyl</Text>
            <Text style={styles.bodyText}>Language: English</Text>
          </>
        )}

        {activeTab === "Genres" && (
          <>
            <Text style={styles.sectionTitle}>Genres</Text>
            <View style={styles.chipRow}>
              <GenreChip label="Soundtrack" />
              <GenreChip label="Electronic" />
              <GenreChip label="Ambient" />
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
}

/* --- SMALL SUBCOMPONENTS --- */

type StatCardProps = {
  color: string;
  icon: React.ReactNode;
  label: string;
  value: string;
};

function StatCard({ color, icon, label, value }: StatCardProps) {
  return (
    <View style={[styles.statCard, { backgroundColor: color }]}>
      <View style={styles.statIcon}>{icon}</View>
      <Text style={styles.statLabel}>
        {label} <Text style={styles.statValue}>{value}</Text>
      </Text>
    </View>
  );
}

type TrackRowProps = {
  index: number;
  title: string;
  duration: string;
};

function TrackRow({ index, title, duration }: TrackRowProps) {
  return (
    <View style={styles.trackRow}>
      <Text style={styles.trackIndex}>{index}.</Text>
      <View style={{ flex: 1 }}>
        <Text style={styles.trackTitle}>{title}</Text>
      </View>
      <Text style={styles.trackDuration}>{duration}</Text>
    </View>
  );
}

function GenreChip({ label }: { label: string }) {
  return (
    <View style={styles.chip}>
      <Text style={styles.chipText}>{label}</Text>
    </View>
  );
}

/* --- STYLES --- */

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#181B20",
  },
  content: {
    paddingBottom: 32,
  },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 8,
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  headerRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 12,
  },
  metaText: {
    color: "#9EABBB",
    fontSize: 14,
    marginBottom: 6,
  },
  metaArtist: {
    fontWeight: "600",
  },

  coverWrapper: {
    width: 177,
    height: 165,
    borderRadius: 3,
    overflow: "hidden",
    backgroundColor: "#E3E3E3",
  },
  coverImage: {
    width: "100%",
    height: "100%",
  },

  // DESCRIPTION
  descriptionBox: {
    marginTop: 24,
    marginHorizontal: 16,
  },
  descriptionHeaderRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  descriptionText: {
    flex: 1,
    color: "#BFCAD4",
    fontSize: 14,
    lineHeight: 18,
  },
  moreDescriptionButton: {
    marginLeft: 8,
    paddingHorizontal: 4,
    paddingVertical: 4,
    justifyContent: "flex-start",
  },

  // STATS
  statsRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginHorizontal: 16,
    marginTop: 24,
    alignItems: "center",

  },
  statCard: {
    flex: 1,
    borderRadius: 9,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 4,
  },
  statIcon: {
    marginBottom: 8,
  },
  statLabel: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  statValue: {
    fontWeight: "700",
  },

  // TABS
  tabsRow: {
    flexDirection: "row",
    marginTop: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#252932",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
  tabLabel: {
    fontSize: 16,
    color: "#4C5A6A",
  },
  tabLabelActive: {
    color: "#FFFFFF",
  },
  tabIndicator: {
    marginTop: 4,
    height: 2,
    width: "60%",
    borderRadius: 4,
    backgroundColor: "#E8B931",
  },

  tabContent: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  bodyText: {
    color: "#BFCAD4",
    fontSize: 14,
    marginBottom: 4,
  },

  // TRACKS
  trackRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: "#2A2E38",
  },
  trackIndex: {
    color: "#9EABBB",
    width: 24,
    fontSize: 14,
  },
  trackTitle: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  trackDuration: {
    color: "#9EABBB",
    fontSize: 13,
  },

  // GENRE CHIPS
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 4,
  },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "#252932",
  },
  chipText: {
    color: "#FFFFFF",
    fontSize: 13,
  },
});

export { };

