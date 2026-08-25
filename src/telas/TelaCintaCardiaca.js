import React from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import {
  Bluetooth,
  ClipboardList,
  CheckCircle2,
  BatteryMedium,
  HeartPulse,
  Activity,
} from "lucide-react-native";

import AppShell from "../componentes/AppShell";
import Card from "../componentes/Card";
import SectionHeader from "../componentes/SectionHeader";
import StatusBadge from "../componentes/StatusBadge";
import PrimaryButton from "../componentes/PrimaryButton";

import { colors } from "../styles/colors";
import { spacing } from "../styles/spacing";

export default function TelaCintaCardiaca({
  tela,
  setTela,
}) {
  return (
    <AppShell
      tela={tela}
      setTela={setTela}
      eyebrow="Dispositivo wearable"
      title="Cinta cardíaca"
      subtitle="Conecte e acompanhe o dispositivo Bluetooth utilizado pelo paciente."
    >
      <SectionHeader
        icon={Bluetooth}
        title="Status da cinta"
        subtitle="Acompanhe a conexão e o funcionamento do dispositivo"
      />

      <View style={styles.deviceCard}>
        <View style={styles.deviceTop}>
          <View style={styles.bluetoothCircle}>
            <Bluetooth
              size={28}
              color={colors.white}
            />
          </View>

          <View style={styles.deviceText}>
            <Text style={styles.deviceLabel}>
              Dispositivo
            </Text>

            <Text style={styles.deviceTitle}>
              Nenhum dispositivo
            </Text>

            <StatusBadge
              status="desconectado"
            />
          </View>
        </View>

        <Text style={styles.deviceDescription}>
          Conecte a cinta EMPS para iniciar o
          monitoramento dos sinais do paciente.
        </Text>

        <PrimaryButton
          title="Conectar cinta cardíaca"
          icon={Bluetooth}
          onPress={() => {
            // conexão será implementada depois
          }}
        />
      </View>

      <SectionHeader
        icon={Activity}
        title="Monitoramento"
        subtitle="Informações do dispositivo conectado"
      />

      <View style={styles.metricsRow}>
        <View style={styles.metricCard}>
          <View style={styles.metricIcon}>
            <HeartPulse
              size={21}
              color={colors.danger}
            />
          </View>

          <Text style={styles.metricValue}>
            --
          </Text>

          <Text style={styles.metricUnit}>
            BPM
          </Text>

          <Text style={styles.metricLabel}>
            Frequência cardíaca
          </Text>
        </View>

        <View style={styles.metricCard}>
          <View style={styles.metricIcon}>
            <Activity
              size={21}
              color={colors.primary}
            />
          </View>

          <Text style={styles.metricValue}>
            --
          </Text>

          <Text style={styles.metricUnit}>
            m/s²
          </Text>

          <Text style={styles.metricLabel}>
            Movimento
          </Text>
        </View>
      </View>

      <Card>
        <SectionHeader
          icon={BatteryMedium}
          title="Bateria"
          subtitle="Nível de carga do wearable"
        />

        <View style={styles.batteryRow}>
          <View style={styles.batteryInfo}>
            <Text style={styles.batteryValue}>
              --
            </Text>

            <Text style={styles.batteryLabel}>
              aguardando dispositivo
            </Text>
          </View>

          <View style={styles.batteryOuter}>
            <View
              style={[
                styles.batteryInner,
                {
                  width: "0%",
                },
              ]}
            />
          </View>
        </View>
      </Card>

      <Card>
        <SectionHeader
          icon={ClipboardList}
          title="Como conectar"
          subtitle="Siga os passos abaixo para iniciar"
        />

        {[
          "Ligue a cinta cardíaca e coloque-a no corpo.",
          "Ative o Bluetooth no celular.",
          "Clique em conectar e selecione o dispositivo EMPS.",
        ].map((texto, index) => (
          <View
            key={index}
            style={styles.stepRow}
          >
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>
                {index + 1}
              </Text>
            </View>

            <Text style={styles.stepText}>
              {texto}
            </Text>

            <CheckCircle2
              size={18}
              color={colors.lilac}
            />
          </View>
        ))}
      </Card>

      <View style={styles.infoBox}>
        <Bluetooth
          size={21}
          color={colors.primary}
        />

        <Text style={styles.infoText}>
          Quando a cinta estiver conectada, os dados de
          frequência cardíaca e movimento serão exibidos aqui.
        </Text>
      </View>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  deviceCard: {
    backgroundColor: colors.primaryDark,

    borderRadius: 22,

    padding: spacing.lg,

    marginBottom: spacing.xxl,

    shadowColor: colors.primary,
    shadowOpacity: 0.16,
    shadowRadius: 14,

    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 5,
  },

  deviceTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  bluetoothCircle: {
    width: 58,
    height: 58,

    borderRadius: 18,

    backgroundColor: "rgba(255,255,255,0.14)",

    alignItems: "center",
    justifyContent: "center",

    marginRight: spacing.md,
  },

  deviceText: {
    flex: 1,
  },

  deviceLabel: {
    color: colors.pink,

    fontSize: 10,

    fontWeight: "700",
  },

  deviceTitle: {
    color: colors.white,

    fontSize: 17,

    fontWeight: "900",

    marginTop: 2,
    marginBottom: spacing.sm,
  },

  deviceDescription: {
    color: "#DDD1F1",

    fontSize: 11,

    lineHeight: 17,

    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },

  metricsRow: {
    flexDirection: "row",

    gap: spacing.md,

    marginBottom: spacing.xxl,
  },

  metricCard: {
    flex: 1,

    backgroundColor: colors.white,

    minHeight: 145,

    borderRadius: 20,

    padding: spacing.lg,

    borderWidth: 1,
    borderColor: colors.border,

    shadowColor: colors.primary,
    shadowOpacity: 0.05,
    shadowRadius: 10,

    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 2,
  },

  metricIcon: {
    width: 40,
    height: 40,

    borderRadius: 13,

    backgroundColor: colors.soft,

    alignItems: "center",
    justifyContent: "center",

    marginBottom: spacing.md,
  },

  metricValue: {
    color: colors.textPrimary,

    fontSize: 22,

    fontWeight: "900",
  },

  metricUnit: {
    color: colors.textSecondary,

    fontSize: 9,

    marginTop: 1,
  },

  metricLabel: {
    color: colors.textMuted,

    fontSize: 10,

    lineHeight: 15,

    marginTop: spacing.sm,
  },

  batteryRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  batteryInfo: {
    width: 105,
  },

  batteryValue: {
    color: colors.primary,

    fontSize: 24,

    fontWeight: "900",
  },

  batteryLabel: {
    color: colors.textMuted,

    fontSize: 9,

    marginTop: 2,
  },

  batteryOuter: {
    flex: 1,

    height: 13,

    borderRadius: 999,

    backgroundColor: colors.soft,

    overflow: "hidden",
  },

  batteryInner: {
    height: "100%",

    borderRadius: 999,

    backgroundColor: colors.success,
  },

  stepRow: {
    flexDirection: "row",
    alignItems: "center",

    paddingVertical: spacing.md,

    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  stepNumber: {
    width: 32,
    height: 32,

    borderRadius: 16,

    backgroundColor: colors.primaryLight,

    alignItems: "center",
    justifyContent: "center",

    marginRight: spacing.md,
  },

  stepNumberText: {
    color: colors.primary,

    fontSize: 12,

    fontWeight: "900",
  },

  stepText: {
    flex: 1,

    color: colors.textSecondary,

    fontSize: 11,

    lineHeight: 16,

    paddingRight: spacing.sm,
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

  infoText: {
    flex: 1,

    color: colors.textSecondary,

    fontSize: 10,

    lineHeight: 16,

    marginLeft: spacing.md,
  },
});