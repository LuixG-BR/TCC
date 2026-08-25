import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { colors } from "../styles/colors";
import { spacing } from "../styles/spacing";

export default function SectionHeader({
  title,
  subtitle,
  icon: Icon,
}) {
  return (
    <View style={styles.container}>
      {Icon && (
        <View style={styles.iconContainer}>
          <Icon
            size={21}
            color={colors.primary}
          />
        </View>
      )}

      <View style={styles.textContainer}>
        <Text style={styles.title}>
          {title}
        </Text>

        {subtitle && (
          <Text style={styles.subtitle}>
            {subtitle}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.lg,
  },

  iconContainer: {
    width: 44,
    height: 44,

    borderRadius: 14,

    backgroundColor: colors.soft,

    alignItems: "center",
    justifyContent: "center",

    marginRight: spacing.md,
  },

  textContainer: {
    flex: 1,
  },

  title: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: "800",
  },

  subtitle: {
    color: colors.textSecondary,
    fontSize: 11,
    lineHeight: 16,
    marginTop: 3,
  },
});