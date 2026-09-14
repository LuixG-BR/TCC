import React from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import {
  BarChart3,
  TrendingUp,
  Clock3,
  PieChart,
} from "lucide-react-native";

import AppShell from "../componentes/AppShell";
import Card from "../componentes/Card";
import SectionHeader from "../componentes/SectionHeader";

import { colors } from "../styles/colors";
import { spacing } from "../styles/spacing";

export default function TelaAnalises({
  tela,
  setTela,
}) {
  const tendencia = [
    48,
    72,
    58,
    94,
    80,
    108,
    72,
  ];

  const horarios = [
    42,
    55,
    48,
    72,
    58,
    65,
    44,
  ];

  return (
    <AppShell
      tela={tela}
      setTela={setTela}
      eyebrow="Acompanhamento"
      title="Relatórios e análises"
      subtitle="Visualize padrões e tendências dos registros do paciente."
    >
      <SectionHeader
        icon={BarChart3}
        title="Visão geral"
        subtitle="Indicadores das últimas semanas"
      />

      {/* TENDÊNCIA SEMANAL */}

      <Card>
        <View style={styles.cardHeader}>
          <View style={styles.iconBox}>
            <TrendingUp
              size={20}
              color={colors.primary}
            />
          </View>

          <View>
            <Text style={styles.cardTitle}>
              Tendência semanal
            </Text>

            <Text style={styles.cardSubtitle}>
              Últimas semanas
            </Text>
          </View>
        </View>

        <View style={styles.chart}>
          {tendencia.map((altura, index) => (
            <View
              key={index}
              style={styles.barContainer}
            >
              <View
                style={[
                  styles.bar,
                  {
                    height: altura,
                  },
                ]}
              />

              <Text style={styles.barLabel}>
                {index + 1}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.chartLegend}>
          <View style={styles.legendDot} />

          <Text style={styles.legendText}>
            Número de eventos registrados
          </Text>
        </View>
      </Card>

      {/* DISTRIBUIÇÃO */}

      <Card>
        <View style={styles.cardHeader}>
          <View style={styles.iconBox}>
            <PieChart
              size={20}
              color={colors.primary}
            />
          </View>

          <View>
            <Text style={styles.cardTitle}>
              Distribuição por tipo
            </Text>

            <Text style={styles.cardSubtitle}>
              Registros monitorados
            </Text>
          </View>
        </View>

        <View style={styles.distributionContainer}>
          <View style={styles.fakePie}>
            <View style={styles.fakePieInner}>
              <Text style={styles.pieValue}>
                72%
              </Text>

              <Text style={styles.pieLabel}>
                normal
              </Text>
            </View>
          </View>

          <View style={styles.legendContainer}>
            <View style={styles.legendRow}>
              <View
                style={[
                  styles.legendIndicator,
                  {
                    backgroundColor:
                      colors.success,
                  },
                ]}
              />

              <View>
                <Text style={styles.legendTitle}>
                  Normal
                </Text>

                <Text style={styles.legendValue}>
                  72%
                </Text>
              </View>
            </View>

            <View style={styles.legendRow}>
              <View
                style={[
                  styles.legendIndicator,
                  {
                    backgroundColor:
                      colors.warning,
                  },
                ]}
              />

              <View>
                <Text style={styles.legendTitle}>
                  Alerta
                </Text>

                <Text style={styles.legendValue}>
                  20%
                </Text>
              </View>
            </View>

            <View style={styles.legendRow}>
              <View
                style={[
                  styles.legendIndicator,
                  {
                    backgroundColor:
                      colors.danger,
                  },
                ]}
              />

              <View>
                <Text style={styles.legendTitle}>
                  Emergência
                </Text>

                <Text style={styles.legendValue}>
                  8%
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Card>

      {/* HORÁRIOS */}

      <Card>
        <View style={styles.cardHeader}>
          <View style={styles.iconBox}>
            <Clock3
              size={20}
              color={colors.primary}
            />
          </View>

          <View>
            <Text style={styles.cardTitle}>
              Horário dos eventos
            </Text>

            <Text style={styles.cardSubtitle}>
              Distribuição ao longo do dia
            </Text>
          </View>
        </View>

        <View style={styles.chart}>
          {horarios.map((altura, index) => (
            <View
              key={index}
              style={styles.barContainer}
            >
              <View
                style={[
                  styles.timeBar,
                  {
                    height: altura,
                  },
                ]}
              />

              <Text style={styles.barLabel}>
                {index * 4}h
              </Text>
            </View>
          ))}
        </View>
      </Card>

      {/* RESUMO */}

      <View style={styles.summaryRow}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>
            Eventos
          </Text>

          <Text style={styles.summaryValue}>
            18
          </Text>

          <Text style={styles.summaryDescription}>
            últimos 30 dias
          </Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>
            Média
          </Text>

          <Text style={styles.summaryValue}>
            4,2
          </Text>

          <Text style={styles.summaryDescription}>
            eventos por semana
          </Text>
        </View>
      </View>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.xl,
  },

  iconBox: {
    width: 44,
    height: 44,

    borderRadius: 14,

    backgroundColor: colors.soft,

    alignItems: "center",
    justifyContent: "center",

    marginRight: spacing.md,
  },

  cardTitle: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: "800",
  },

  cardSubtitle: {
    color: colors.textSecondary,
    fontSize: 10,
    marginTop: 3,
  },

  chart: {
    minHeight: 145,

    flexDirection: "row",

    alignItems: "flex-end",
    justifyContent: "space-between",

    paddingTop: spacing.lg,

    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  barContainer: {
    flex: 1,

    alignItems: "center",
    justifyContent: "flex-end",
  },

  bar: {
    width: 20,

    maxHeight: 120,

    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,

    backgroundColor: colors.primary,

    opacity: 0.85,
  },

  timeBar: {
    width: 20,

    maxHeight: 120,

    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,

    backgroundColor: colors.lilac,
  },

  barLabel: {
    color: colors.textMuted,

    fontSize: 8,

    marginTop: 6,
    marginBottom: 5,
  },

  chartLegend: {
    flexDirection: "row",
    alignItems: "center",

    marginTop: spacing.md,
  },

  legendDot: {
    width: 8,
    height: 8,

    borderRadius: 4,

    backgroundColor: colors.primary,

    marginRight: spacing.sm,
  },

  legendText: {
    color: colors.textSecondary,

    fontSize: 10,
  },

  distributionContainer: {
    flexDirection: "row",
    alignItems: "center",

    paddingVertical: spacing.md,
  },

  fakePie: {
    width: 145,
    height: 145,

    borderRadius: 73,

    backgroundColor: colors.success,

    alignItems: "center",
    justifyContent: "center",

    marginRight: spacing.xl,

    borderWidth: 18,
    borderColor: colors.primaryLight,
  },

  fakePieInner: {
    width: 92,
    height: 92,

    borderRadius: 46,

    backgroundColor: colors.white,

    alignItems: "center",
    justifyContent: "center",
  },

  pieValue: {
    color: colors.textPrimary,

    fontSize: 24,

    fontWeight: "900",
  },

  pieLabel: {
    color: colors.textMuted,

    fontSize: 9,

    marginTop: 2,
  },

  legendContainer: {
    flex: 1,
  },

  legendRow: {
    flexDirection: "row",
    alignItems: "center",

    marginBottom: spacing.md,
  },

  legendIndicator: {
    width: 10,
    height: 10,

    borderRadius: 5,

    marginRight: spacing.sm,
  },

  legendTitle: {
    color: colors.textPrimary,

    fontSize: 11,

    fontWeight: "700",
  },

  legendValue: {
    color: colors.textSecondary,

    fontSize: 9,

    marginTop: 1,
  },

  summaryRow: {
    flexDirection: "row",

    gap: spacing.md,

    marginBottom: spacing.xl,
  },

  summaryCard: {
    flex: 1,

    backgroundColor: colors.white,

    borderRadius: 18,

    padding: spacing.lg,

    borderWidth: 1,
    borderColor: colors.border,
  },

  summaryLabel: {
    color: colors.textSecondary,

    fontSize: 10,
  },

  summaryValue: {
    color: colors.primary,

    fontSize: 25,

    fontWeight: "900",

    marginTop: 5,
  },

  summaryDescription: {
    color: colors.textMuted,

    fontSize: 9,

    marginTop: 3,
  },
});