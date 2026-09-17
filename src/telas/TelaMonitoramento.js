import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import {
  HeartPulse,
  Activity,
  Timer,
  Square,
  BluetoothConnected,
} from "lucide-react-native";

import AppShell from "../componentes/AppShell";

import { colors } from "../styles/colors";
import { spacing } from "../styles/spacing";

export default function TelaMonitoramento({
  tela,
  setTela,
}) {
  // Por enquanto os valores são simulados.
  // Futuramente serão recebidos do ESP32 via BLE.
  const [bpm, setBpm] = useState(82);
  const [movimento, setMovimento] = useState(2.4);

  const [segundos, setSegundos] = useState(0);
  const [monitorando, setMonitorando] = useState(false);

  useEffect(() => {
    let intervalo;

    if (monitorando) {
      intervalo = setInterval(() => {
        setSegundos((tempoAtual) => tempoAtual + 1);
      }, 1000);
    }

    return () => {
      if (intervalo) {
        clearInterval(intervalo);
      }
    };
  }, [monitorando]);

  function formatarTempo(totalSegundos) {
    const horas = Math.floor(
      totalSegundos / 3600
    );

    const minutos = Math.floor(
      (totalSegundos % 3600) / 60
    );

    const segundosRestantes =
      totalSegundos % 60;

    return [
      horas,
      minutos,
      segundosRestantes,
    ]
      .map((valor) =>
        String(valor).padStart(2, "0")
      )
      .join(":");
  }

  function iniciarMonitoramento() {
    setSegundos(0);
    setMonitorando(true);
  }

  function encerrarMonitoramento() {
    setMonitorando(false);

    // Futuramente:
    // setTela("resumoMonitoramento");
  }

  return (
    <AppShell
      tela={tela}
      setTela={setTela}
      title="Monitoramento"
      subtitle="Acompanhe os dados da cinta em tempo real."
    >

      {/* CONEXÃO */}

      <View style={styles.connectionCard}>
        <View style={styles.connectionIcon}>
          <BluetoothConnected
            size={22}
            color={colors.primary}
          />
        </View>

        <View style={styles.connectionInfo}>
          <Text style={styles.connectionTitle}>
            Cinta EMPS
          </Text>

          <Text style={styles.connectionSubtitle}>
            Dispositivo conectado
          </Text>
        </View>

        <View style={styles.connectedBadge}>
          <View style={styles.connectedDot} />

          <Text style={styles.connectedText}>
            Conectada
          </Text>
        </View>
      </View>

      {/* TEMPO */}

      <View style={styles.timerCard}>
        <View style={styles.timerLabelContainer}>
          <Timer
            size={17}
            color={colors.textMuted}
          />

          <Text style={styles.timerLabel}>
            TEMPO DE MONITORAMENTO
          </Text>
        </View>

        <Text style={styles.timer}>
          {formatarTempo(segundos)}
        </Text>

        <View style={styles.monitorStatus}>
          <View
            style={[
              styles.monitorDot,
              monitorando
                ? styles.monitorDotActive
                : styles.monitorDotInactive,
            ]}
          />

          <Text style={styles.monitorStatusText}>
            {monitorando
              ? "Monitoramento em andamento"
              : "Aguardando início"}
          </Text>
        </View>
      </View>

      {/* FREQUÊNCIA CARDÍACA */}

      <View style={styles.heartCard}>
        <View style={styles.heartIcon}>
          <HeartPulse
            size={30}
            color={colors.primary}
          />
        </View>

        <Text style={styles.metricTitle}>
          FREQUÊNCIA CARDÍACA
        </Text>

        <View style={styles.bpmContainer}>
          <Text style={styles.bpm}>
            {monitorando ? bpm : "--"}
          </Text>

          <Text style={styles.bpmUnit}>
            BPM
          </Text>
        </View>

        <Text style={styles.metricHelp}>
          Leitura recebida da cinta
        </Text>
      </View>

      {/* MOVIMENTO + STATUS */}

      <View style={styles.metricsRow}>

        <View style={styles.metricCard}>
          <View style={styles.metricIcon}>
            <Activity
              size={22}
              color={colors.primary}
            />
          </View>

          <Text style={styles.smallMetricTitle}>
            Movimento
          </Text>

          <View style={styles.metricValueRow}>
            <Text style={styles.metricValue}>
              {monitorando
                ? movimento.toFixed(1)
                : "--"}
            </Text>

            <Text style={styles.metricUnit}>
              m/s²
            </Text>
          </View>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.smallMetricTitle}>
            Status
          </Text>

          <View style={styles.statusArea}>
            <View
              style={[
                styles.statusCircle,
                monitorando
                  ? styles.statusNormal
                  : styles.statusWaiting,
              ]}
            />

            <Text
              style={[
                styles.statusText,
                monitorando
                  ? styles.statusTextNormal
                  : styles.statusTextWaiting,
              ]}
            >
              {monitorando
                ? "Normal"
                : "Aguardando"}
            </Text>
          </View>

          <Text style={styles.statusHelp}>
            Análise do sistema
          </Text>
        </View>
      </View>

      {/* INFORMAÇÃO */}

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>
          Monitoramento em tempo real
        </Text>

        <Text style={styles.infoText}>
          Durante a sessão, os dados coletados
          pela cinta serão enviados ao sistema
          para análise e registro.
        </Text>
      </View>

      {/* BOTÃO */}

      {!monitorando ? (
        <TouchableOpacity
          style={styles.startButton}
          activeOpacity={0.85}
          onPress={iniciarMonitoramento}
        >
          <HeartPulse
            size={21}
            color={colors.white}
          />

          <Text style={styles.buttonText}>
            Iniciar monitoramento
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.stopButton}
          activeOpacity={0.85}
          onPress={encerrarMonitoramento}
        >
          <Square
            size={18}
            color={colors.white}
            fill={colors.white}
          />

          <Text style={styles.buttonText}>
            Encerrar monitoramento
          </Text>
        </TouchableOpacity>
      )}

    </AppShell>
  );
}

const styles = StyleSheet.create({
  connectionCard: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: colors.surface,

    borderWidth: 1,
    borderColor: colors.border,

    borderRadius: 18,

    padding: spacing.lg,

    marginBottom: spacing.lg,
  },

  connectionIcon: {
    width: 45,
    height: 45,

    alignItems: "center",
    justifyContent: "center",

    borderRadius: 14,

    backgroundColor: colors.background,
  },

  connectionInfo: {
    flex: 1,

    marginLeft: spacing.md,
  },

  connectionTitle: {
    fontSize: 15,
    fontWeight: "700",

    color: colors.textPrimary,
  },

  connectionSubtitle: {
    marginTop: 2,

    fontSize: 11,

    color: colors.textMuted,
  },

  connectedBadge: {
    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 9,
    paddingVertical: 6,

    borderRadius: 15,

    backgroundColor: "#EAF8F0",
  },

  connectedDot: {
    width: 7,
    height: 7,

    borderRadius: 4,

    marginRight: 5,

    backgroundColor: colors.success,
  },

  connectedText: {
    fontSize: 10,
    fontWeight: "700",

    color: colors.success,
  },

  /* TIMER */

  timerCard: {
    alignItems: "center",

    padding: spacing.xl,

    backgroundColor: colors.surface,

    borderWidth: 1,
    borderColor: colors.border,

    borderRadius: 22,

    marginBottom: spacing.lg,
  },

  timerLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  timerLabel: {
    marginLeft: 6,

    fontSize: 10,
    fontWeight: "700",

    letterSpacing: 0.8,

    color: colors.textMuted,
  },

  timer: {
    marginTop: spacing.md,

    fontSize: 40,
    fontWeight: "800",

    letterSpacing: 1,

    color: colors.textPrimary,
  },

  monitorStatus: {
    flexDirection: "row",
    alignItems: "center",

    marginTop: spacing.sm,
  },

  monitorDot: {
    width: 7,
    height: 7,

    borderRadius: 4,

    marginRight: 6,
  },

  monitorDotActive: {
    backgroundColor: colors.success,
  },

  monitorDotInactive: {
    backgroundColor: colors.textMuted,
  },

  monitorStatusText: {
    fontSize: 11,

    color: colors.textSecondary,
  },

  /* HEART */

  heartCard: {
    alignItems: "center",

    padding: spacing.xxl,

    backgroundColor: colors.surface,

    borderWidth: 1,
    borderColor: colors.border,

    borderRadius: 22,

    marginBottom: spacing.lg,
  },

  heartIcon: {
    width: 56,
    height: 56,

    alignItems: "center",
    justifyContent: "center",

    borderRadius: 18,

    backgroundColor: colors.background,

    marginBottom: spacing.md,
  },

  metricTitle: {
    fontSize: 10,
    fontWeight: "700",

    letterSpacing: 0.8,

    color: colors.textMuted,
  },

  bpmContainer: {
    flexDirection: "row",
    alignItems: "baseline",

    marginTop: 4,
  },

  bpm: {
    fontSize: 55,
    fontWeight: "800",

    color: colors.textPrimary,
  },

  bpmUnit: {
    marginLeft: 7,

    fontSize: 14,
    fontWeight: "700",

    color: colors.primary,
  },

  metricHelp: {
    fontSize: 11,

    color: colors.textMuted,
  },

  /* METRICS */

  metricsRow: {
    flexDirection: "row",

    gap: spacing.md,

    marginBottom: spacing.lg,
  },

  metricCard: {
    flex: 1,

    minHeight: 150,

    padding: spacing.lg,

    backgroundColor: colors.surface,

    borderWidth: 1,
    borderColor: colors.border,

    borderRadius: 20,
  },

  metricIcon: {
    width: 39,
    height: 39,

    alignItems: "center",
    justifyContent: "center",

    borderRadius: 12,

    backgroundColor: colors.background,

    marginBottom: spacing.md,
  },

  smallMetricTitle: {
    fontSize: 11,

    color: colors.textMuted,
  },

  metricValueRow: {
    flexDirection: "row",
    alignItems: "baseline",

    marginTop: 4,
  },

  metricValue: {
    fontSize: 25,
    fontWeight: "800",

    color: colors.textPrimary,
  },

  metricUnit: {
    marginLeft: 4,

    fontSize: 10,
    fontWeight: "600",

    color: colors.textSecondary,
  },

  /* STATUS */

  statusArea: {
    flexDirection: "row",
    alignItems: "center",

    marginTop: 18,
  },

  statusCircle: {
    width: 9,
    height: 9,

    borderRadius: 5,

    marginRight: 7,
  },

  statusNormal: {
    backgroundColor: colors.success,
  },

  statusWaiting: {
    backgroundColor: colors.textMuted,
  },

  statusText: {
    fontSize: 15,
    fontWeight: "700",
  },

  statusTextNormal: {
    color: colors.success,
  },

  statusTextWaiting: {
    color: colors.textMuted,
  },

  statusHelp: {
    marginTop: 7,

    fontSize: 10,

    color: colors.textMuted,
  },

  /* INFO */

  infoCard: {
    padding: spacing.lg,

    backgroundColor: colors.surfaceSoft,

    borderWidth: 1,
    borderColor: colors.border,

    borderRadius: 18,

    marginBottom: spacing.xl,
  },

  infoTitle: {
    fontSize: 13,
    fontWeight: "700",

    color: colors.textPrimary,
  },

  infoText: {
    marginTop: 5,

    fontSize: 11,
    lineHeight: 17,

    color: colors.textSecondary,
  },

  /* BUTTONS */

  startButton: {
    height: 58,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    borderRadius: 18,

    backgroundColor: colors.primary,

    marginBottom: spacing.xxl,

    elevation: 4,
  },

  stopButton: {
    height: 58,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    borderRadius: 18,

    backgroundColor: "#C83E4D",

    marginBottom: spacing.xxl,

    elevation: 4,
  },

  buttonText: {
    marginLeft: spacing.sm,

    fontSize: 15,
    fontWeight: "700",

    color: colors.white,
  },
});