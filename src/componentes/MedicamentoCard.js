import React from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import {
  Pill,
  Clock3,
  Stethoscope,
} from "lucide-react-native";

import Card from "./Card";

import { colors } from "../styles/colors";
import { spacing } from "../styles/spacing";

export default function MedicamentoCard({
  nome,
  dose,
  hora1,
  hora2,
  medico,
}) {
  return (
    <Card>
      <View style={styles.header}>
        <View style={styles.icon}>
          <Pill
            size={22}
            color={colors.primary}
          />
        </View>

        <View style={styles.headerText}>
          <Text style={styles.nome}>
            {nome}
          </Text>

          <Text style={styles.dose}>
            {dose}
          </Text>
        </View>
      </View>

      <View style={styles.separator} />

      <View style={styles.infoRow}>
        <Clock3
          size={17}
          color={colors.primary}
        />

        <View style={styles.infoText}>
          <Text style={styles.infoLabel}>
            Horários
          </Text>

          <Text style={styles.infoValue}>
            {hora1} • {hora2}
          </Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <Stethoscope
          size={17}
          color={colors.primary}
        />

        <View style={styles.infoText}>
          <Text style={styles.infoLabel}>
            Prescrito por
          </Text>

          <Text style={styles.infoValue}>
            {medico}
          </Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
  },

  icon: {
    width: 48,
    height: 48,

    borderRadius: 15,

    backgroundColor: colors.soft,

    alignItems: "center",
    justifyContent: "center",

    marginRight: spacing.md,
  },

  headerText: {
    flex: 1,
  },

  nome: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: "800",
  },

  dose: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 4,
  },

  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.lg,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
  },

  infoText: {
    marginLeft: spacing.md,
    flex: 1,
  },

  infoLabel: {
    color: colors.textSecondary,
    fontSize: 10,
  },

  infoValue: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: "700",
    marginTop: 2,
  },
});