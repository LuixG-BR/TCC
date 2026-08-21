import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StatusBar } from "react-native";
import {
  HeartPulse,
  LayoutDashboard,
  UserRound,
  Pill,
  BarChart3,
  Bluetooth,
  Bell,
  ShieldCheck,
} from "lucide-react-native";
import styles from "../styles/styles";

const tabs = [
  ["inicio", "Início", LayoutDashboard],
  ["perfil", "Paciente", UserRound],
  ["medicacoes", "Remédios", Pill],
  ["analises", "Análises", BarChart3],
  ["cinta", "Cinta", Bluetooth],
];

export default function AppShell({ tela, setTela, title, subtitle, children }) {
  return (
    <View style={styles.appShell}>
      <StatusBar barStyle="light-content" backgroundColor="#572EA9" />

      <View style={styles.mobileHeader}>
        <View style={styles.headerBubbleOne} />
        <View style={styles.headerBubbleTwo} />

        <View style={styles.headerTopRow}>
          <View style={styles.brandRow}>
            <View style={styles.mobileBrandIcon}>
              <HeartPulse size={24} color="#FFFFFF" />
            </View>
            <View>
              <Text style={styles.mobileBrandName}>EMPS</Text>
              <Text style={styles.mobileBrandCaption}>Monitoramento inteligente</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.mobileNotification}>
            <Bell size={21} color="#572EA9" />
            <View style={styles.mobileNotificationBadge}>
              <Text style={styles.mobileNotificationBadgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.mobilePageInfo}>
          <Text style={styles.mobileEyebrow}>SISTEMA EMPS</Text>
          <Text style={styles.mobilePageTitle}>{title}</Text>
          <Text style={styles.mobilePageSubtitle}>{subtitle}</Text>
        </View>
      </View>

      <ScrollView
        style={styles.pageScroll}
        contentContainerStyle={styles.pageContent}
        showsVerticalScrollIndicator={false}
      >
        {children}

        <View style={styles.pageFooter}>
          <View style={styles.secureRow}>
            <ShieldCheck size={15} color="#764EC7" />
            <Text style={styles.footerSecure}>Ambiente seguro e criptografado</Text>
          </View>
          <Text style={styles.copyright}>EMPS • Sistema de Monitoramento</Text>
        </View>
      </ScrollView>

      <View style={styles.bottomNavigation}>
        {tabs.map(([id, label, Icon]) => {
          const active = tela === id;
          return (
            <TouchableOpacity
              key={id}
              onPress={() => setTela(id)}
              style={styles.bottomTab}
            >
              <View style={[styles.bottomTabIcon, active && styles.bottomTabIconActive]}>
                <Icon size={21} color={active ? "#FFFFFF" : "#8B7FA3"} />
              </View>
              <Text style={[styles.bottomTabText, active && styles.bottomTabTextActive]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
