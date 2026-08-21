import React from "react";
import { View, Text } from "react-native";
import { LayoutDashboard, ShieldCheck, Bell, Pill } from "lucide-react-native";
import styles from "../styles/styles";
import AppShell from "../componentes/AppShell";

export default function TelaMenu({ setTela }) {
  return (
    <AppShell
      tela="inicio"
      setTela={setTela}
      title="Olá, Doutor"
      subtitle="Acompanhe rapidamente as principais informações do paciente."
    >
      <View style={styles.dashboardHero}>
        <View style={styles.dashboardHeroText}>
          <Text style={styles.dashboardEyebrow}>SISTEMA EMPS</Text>
          <Text style={styles.dashboardHeroTitle}>
            Monitoramento simples, seguro e conectado.
          </Text>
          <Text style={styles.dashboardHeroSub}>
            Tenha acesso rápido à ficha do paciente, medicações, análises e à conexão da cinta cardíaca.
          </Text>
        </View>
        <View style={styles.dashboardIcon}>
          <LayoutDashboard size={34} color="#572EA9" />
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Bell size={24} color="#764EC7" />
          <Text style={styles.statValue}>03</Text>
          <Text style={styles.statLabel}>Alertas ativos</Text>
        </View>
        <View style={styles.statCard}>
          <Pill size={24} color="#764EC7" />
          <Text style={styles.statValue}>02</Text>
          <Text style={styles.statLabel}>Medicações hoje</Text>
        </View>
        <View style={styles.statCard}>
          <ShieldCheck size={26} color="#572EA9" />
          <Text style={styles.statLabel}>Dados protegidos e monitoramento seguro</Text>
        </View>
      </View>
    </AppShell>
  );
}
