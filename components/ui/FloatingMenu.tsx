import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
    Animated,
    Easing,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

type FloatingMenuProps = {
  onUsersPress?: () => void;
  onProfilePress?: () => void;
  onLogReviewPress?: () => void;
};

export default function FloatingMenu({
  onProfilePress,
  onLogReviewPress,
  onUsersPress,
}: FloatingMenuProps) {
  const [open, setOpen] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    const toValue = open ? 0 : 1;

    Animated.timing(animation, {
      toValue,
      duration: 220,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();

    setOpen(!open);
  };

  const menuItems = [
    {
      key: "log",
      label: "Log or Review",
      color: "#2EA66D",
      onPress: onLogReviewPress,
      // plus icon
      renderIcon: () => (
        <MaterialCommunityIcons name="plus" size={22} color="#1E1E1E" />
      ),
    },

    {
      key: "profile",
      label: "Profile",
      color: "#BA58A0",
      onPress: onProfilePress,
      // person icon
      renderIcon: () => (
        <Ionicons name="person-outline" size={20} color="#1E1E1E" />
      ),
    },
    {
      key: "users",
      label: "Users",
      color: "#CF514F",
      onPress: onUsersPress,
      // group / users icon
      renderIcon: () => (
        <Ionicons name="people-outline" size={20} color="#1E1E1E" />
      ),
    },
  ];

  // Backdrop opacity directly uses animation (0 → 1)
  const backdropStyle = {
    opacity: animation,
  };
  return (
    <View pointerEvents="box-none" style={styles.fullScreen}>
      {/* BACKDROP */}
      <Animated.View
        pointerEvents={open ? "auto" : "none"}
        style={[styles.backdrop, { opacity: animation }]}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={toggleMenu} />
      </Animated.View>

      {/* FLOATING MENU ANCHORED BOTTOM-RIGHT */}
      <View style={styles.root}>
        {menuItems.map((item, index) => {
          const offset = (index + 1) * 60;

          const translateY = animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -offset],
          });

          const opacity = animation.interpolate({
            inputRange: [0, 0.4, 1],
            outputRange: [0, 0, 1],
          });

          return (
            <Animated.View
              key={item.key}
              style={[
                styles.itemContainer,
                {
                  transform: [{ translateY }],
                  opacity,
                },
              ]}
            >
              <View style={styles.itemRow}>
                <Text style={styles.itemLabel}>{item.label}</Text>
                <Pressable
                  style={[styles.itemButton, { backgroundColor: item.color }]}
                  onPress={() => {
                    item.onPress?.();
                    toggleMenu();
                  }}
                >
                  {item.renderIcon()}
                </Pressable>
              </View>
            </Animated.View>
          );
        })}

        {/* MAIN FAB */}
        <Pressable
          style={({ pressed, hovered }) => [
            styles.fab,
            {
              backgroundColor: open
                ? "#FFF"
                : pressed || hovered
                ? "#E5A000"
                : "#E8B931",
            },
          ]}
          onPress={toggleMenu}
        >
          {open ? (
            <MaterialCommunityIcons
              name="close"
              size={24}
              color="#2C2C2C"
            />
          ) : (
            <MaterialCommunityIcons
              name="dots-horizontal"
              size={24}
              color="#2C2C2C"
            />
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 20, // make sure it's above page content
  },
  // dark overlay
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)", // tweak darker/lighter
  },
  root: {
    position: "absolute",
    bottom: 40,
    right: 24,
    alignItems: "center",
  },
  itemContainer: {
    position: "absolute",
    right: 0, // anchor each row to the same right edge as the FAB
    flexDirection: "row-reverse", // button on the right, label on the left
    alignItems: "center",
  },

  // row = [label][circle button]
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  itemButton: {
    width: 44,
    height: 44,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },

  itemLabel: {
    marginRight: 12,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.02,
    color: "#FFFFFF",
    fontWeight: "300",
  },

  fab: {
    width: 49,
    height: 49,
    borderRadius: 32,
    backgroundColor: "#E8B931",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },

  fabIcon: {
    color: "#2C2C2C",
    fontSize: 22,
    fontWeight: "700",
    marginTop: -2,
  },
});
