import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { colors } from "../styles/colors";

export default function StatusBadge({
  status = "normal",
  text,
}) {
  const configs = {
    normal: {
      background: colors.successBackground,
      color: colors.success,
      label: "Normal",
    },

    alerta: {
      background: colors.warningBackground,
      color: colors.warning,
      label: "Alerta",
    },

    emergencia: {
      background: colors.dangerBackground,
      color: colors.danger,
      label: "Emergência",
    },

    conectado: {
      background: colors.successBackground,
      color: colors.success,
      label: "Conectado",
    },

    desconectado: {
      background: "#F1F1F4",
      color: colors.textSecondary,
      label: "Desconectado",
    },
  };

  const config =
    configs[status] || configs.normal;

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: config.background,
        },
      ]}
    >
      <View
        style={[
          styles.dot,
          {
            backgroundColor: config.color,
          },
        ]}
      />

      <Text
        style={[
          styles.text,
          {
            color: config.color,
          },
        ]}
      >
        {text || config.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 11,
    paddingVertical: 7,

    borderRadius: 999,
  },

  dot: {
    width: 7,
    height: 7,

    borderRadius: 4,

    marginRight: 6,
  },

  text: {
    fontSize: 11,
    fontWeight: "800",
  },
});