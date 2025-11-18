import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const TABS = ["Albums", "Activity", "Lists"];

export type HeaderProps = {
  activeTab: string;
  onTabChange: (tab: string) => void;
};

export function HomeScreenHeader({ activeTab, onTabChange }: HeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Needledropd</Text>

      <View style={styles.tabsRow}>
        {TABS.map((tab) => {
          const isActive = tab === activeTab;

          return (
            <TouchableOpacity
              key={tab}
              onPress={() => onTabChange(tab)}
              style={styles.tabButton}
            >
              <Text style={[styles.tabLabel, isActive && styles.activeTab]}>
                {tab}
              </Text>

              {isActive && <View style={styles.activeBar} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
export default HomeScreenHeader;


const styles = StyleSheet.create({
  header: {
    backgroundColor: "#000",
    paddingTop: 40,
    paddingBottom: 12,
    alignItems: "center",
  },

  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
  },

  tabsRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    borderBottomColor: "#181B20",
    borderBottomWidth: 1,
    paddingBottom: 8,
  },

  tabButton: {
    alignItems: "center",
    paddingHorizontal: 10,
  },

  tabLabel: {
    color: "#A0A0A0",
    fontSize: 16,
    fontWeight: "500",
  },

  activeTab: {
    color: "#FFFFFF",
  },

  activeBar: {
    height: 3,
    width: 40,
    backgroundColor: "#E1B941",
    marginTop: 4,
    borderRadius: 20,
  },
});
