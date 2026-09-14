import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import { colors } from "../styles/colors";
import { spacing } from "../styles/spacing";

export default function PrimaryButton({
  title,
  onPress,
  icon: Icon,
  loading = false,
  disabled = false,
  style,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        disabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        <>
          {Icon && (
            <Icon
              size={19}
              color={colors.white}
              style={styles.icon}
            />
          )}

          <Text style={styles.text}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 54,

    borderRadius: 17,

    backgroundColor: colors.primary,

    alignItems: "center",
    justifyContent: "center",

    flexDirection: "row",

    paddingHorizontal: spacing.xl,

    shadowColor: colors.primary,
    shadowOpacity: 0.18,
    shadowRadius: 10,

    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 4,
  },

  disabled: {
    opacity: 0.5,
  },

  icon: {
    marginRight: spacing.sm,
  },

  text: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "800",
  },
});