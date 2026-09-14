import React from "react";
import { View, StyleSheet } from "react-native";

import { colors } from "../styles/colors";
import { spacing } from "../styles/spacing";

export default function Card({ children, style }) {
  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,

    padding: spacing.lg,
    marginBottom: spacing.lg,

    borderWidth: 1,
    borderColor: colors.border,

    shadowColor: colors.primary,
    shadowOpacity: 0.07,
    shadowRadius: 12,

    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 3,
  },
});