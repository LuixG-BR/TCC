import React from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import {
  Pill,
  Clock3,
  CalendarDays,
} from "lucide-react-native";

import AppShell from "../componentes/AppShell";
import MedicamentoCard from "../componentes/MedicamentoCard";
import SectionHeader from "../componentes/SectionHeader";
import Card from "../componentes/Card";

import { colors } from "../styles/colors";
import { spacing } from "../styles/spacing";

export default function TelaMedicacoes({
  tela,
  setTela,
}) {
  return (
    <AppShell
      tela={tela}
      setTela={setTela}
      eyebrow="Tratamento"
      title="Medicações"
      subtitle="Acompanhe os medicamentos, horários e prescrições do paciente."
    >
      <SectionHeader
        icon={Pill}
        title="Medicamentos cadastrados"
        subtitle="Controle organizado dos horários de uso"
      />

      <MedicamentoCard
        nome="Carbamazepina"
        dose="400 mg • 2x ao dia"
        hora1="08:00"
        hora2="20:00"
        medico="Dr(a). Maria Santos"
      />

      <MedicamentoCard
        nome="Levetiracetam"
        dose="500 mg • 2x ao dia"
        hora1="08:00"
        hora2="22:00"
        medico="Dr(a). Maria Santos"
      />

      <SectionHeader
        icon={CalendarDays}
        title="Próximas doses"
        subtitle="Resumo dos próximos horários"
      />

      <Card>
        <View style={styles.scheduleRow}>
          <View style={styles.timeBox}>
            <Text style={styles.time}>
              20:00
            </Text>

            <Text style={styles.period}>
              hoje
            </Text>
          </View>

          <View style={styles.scheduleInfo}>
            <Text style={styles.scheduleTitle}>
              Carbamazepina
            </Text>

            <Text style={styles.scheduleSubtitle}>
              400 mg
            </Text>
          </View>

          <Clock3
            size={18}
            color={colors.primary}
          />
        </View>

        <View style={styles.separator} />

        <View style={styles.scheduleRow}>
          <View style={styles.timeBox}>
            <Text style={styles.time}>
              22:00
            </Text>

            <Text style={styles.period}>
              hoje
            </Text>
          </View>

          <View style={styles.scheduleInfo}>
            <Text style={styles.scheduleTitle}>
              Levetiracetam
            </Text>

            <Text style={styles.scheduleSubtitle}>
              500 mg
            </Text>
          </View>

          <Clock3
            size={18}
            color={colors.primary}
          />
        </View>
      </Card>

      <View style={styles.infoBox}>
        <View style={styles.infoIcon}>
          <Pill
            size={20}
            color={colors.primary}
          />
        </View>

        <View style={styles.infoContent}>
          <Text style={styles.infoTitle}>
            Acompanhamento do tratamento
          </Text>

          <Text style={styles.infoText}>
            Mantenha os horários e doses sempre atualizados para facilitar o acompanhamento do paciente.
          </Text>
        </View>
      </View>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  scheduleRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  timeBox: {
    width: 64,

    backgroundColor: colors.soft,

    borderRadius: 15,

    paddingVertical: spacing.sm,

    alignItems: "center",

    marginRight: spacing.md,
  },

  time: {
    color: colors.primary,

    fontSize: 15,

    fontWeight: "900",
  },

  period: {
    color: colors.textMuted,

    fontSize: 9,

    marginTop: 2,
  },

  scheduleInfo: {
    flex: 1,
  },

  scheduleTitle: {
    color: colors.textPrimary,

    fontSize: 14,

    fontWeight: "800",
  },

  scheduleSubtitle: {
    color: colors.textSecondary,

    fontSize: 10,

    marginTop: 3,
  },

  separator: {
    height: 1,

    backgroundColor: colors.border,

    marginVertical: spacing.lg,
  },

  infoBox: {
    flexDirection: "row",

    alignItems: "flex-start",

    backgroundColor: colors.primaryLight,

    borderRadius: 18,

    padding: spacing.lg,

    borderWidth: 1,

    borderColor: colors.border,

    marginBottom: spacing.xl,
  },

  infoIcon: {
    width: 42,
    height: 42,

    borderRadius: 13,

    backgroundColor: colors.white,

    alignItems: "center",
    justifyContent: "center",

    marginRight: spacing.md,
  },

  infoContent: {
    flex: 1,
  },

  infoTitle: {
    color: colors.textPrimary,

    fontSize: 13,

    fontWeight: "800",
  },

  infoText: {
    color: colors.textSecondary,

    fontSize: 10,

    lineHeight: 16,

    marginTop: 4,
  },
});