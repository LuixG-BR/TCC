import React from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

import {
  House,
  UserRound,
  Pill,
  BarChart3,
  Bluetooth,
  Bell,
  HeartPulse,
} from "lucide-react-native";

import { colors } from "../styles/colors";
import { spacing } from "../styles/spacing";

export default function AppShell({
  children,
  tela,
  setTela,
  title,
  subtitle,
  eyebrow = "EMPS",
  showNavigation = true,
}) {
  const tabs = [
    {
      id: "inicio",
      label: "Início",
      icon: House,
    },
    {
      id: "perfil",
      label: "Paciente",
      icon: UserRound,
    },
    {
      id: "medicacoes",
      label: "Remédios",
      icon: Pill,
    },
    {
      id: "analises",
      label: "Análises",
      icon: BarChart3,
    },
    {
      id: "cinta",
      label: "Cinta",
      icon: Bluetooth,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.circleOne} />
        <View style={styles.circleTwo} />

        <View style={styles.headerTop}>
          <View style={styles.brandContainer}>
            <View style={styles.brandIcon}>
              <HeartPulse
                size={24}
                color={colors.white}
              />
            </View>

            <View>
              <Text style={styles.brand}>
                EMPS
              </Text>

              <Text style={styles.brandSubtitle}>
                Monitoramento inteligente
              </Text>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.notificationButton}
          >
            <Bell
              size={20}
              color={colors.primary}
            />

            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.eyebrow}>
            {eyebrow}
          </Text>

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

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          !showNavigation && styles.contentNoNavigation,
        ]}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>

      {showNavigation && (
        <View style={styles.navigation}>
          {tabs.map((item) => {
            const Icon = item.icon;

            const active =
              tela === item.id;

            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.8}
                onPress={() =>
                  setTela(item.id)
                }
                style={styles.tab}
              >
                <View
                  style={[
                    styles.tabIcon,
                    active &&
                      styles.tabIconActive,
                  ]}
                >
                  <Icon
                    size={20}
                    color={
                      active
                        ? colors.white
                        : colors.textMuted
                    }
                  />
                </View>

                <Text
                  style={[
                    styles.tabText,
                    active &&
                      styles.tabTextActive,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:
      colors.background,
  },

  header: {
    backgroundColor: colors.primary,

    paddingTop: spacing.xl,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxxl,

    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,

    overflow: "hidden",
  },

  circleOne: {
    position: "absolute",

    width: 220,
    height: 220,

    borderRadius: 110,

    backgroundColor:
      colors.lightPurple,

    opacity: 0.13,

    right: -70,
    top: -80,
  },

  circleTwo: {
    position: "absolute",

    width: 150,
    height: 150,

    borderRadius: 75,

    backgroundColor: colors.pink,

    opacity: 0.08,

    left: -70,
    bottom: -80,
  },

  headerTop: {
    flexDirection: "row",

    alignItems: "center",
    justifyContent:
      "space-between",
  },

  brandContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  brandIcon: {
    width: 44,
    height: 44,

    borderRadius: 14,

    backgroundColor:
      "rgba(255,255,255,0.15)",

    borderWidth: 1,
    borderColor:
      "rgba(255,255,255,0.18)",

    alignItems: "center",
    justifyContent: "center",

    marginRight: spacing.md,
  },

  brand: {
    color: colors.white,

    fontSize: 20,

    fontWeight: "900",

    letterSpacing: 1,
  },

  brandSubtitle: {
    color: "#E7DCF9",

    fontSize: 9,

    marginTop: 2,
  },

  notificationButton: {
    width: 43,
    height: 43,

    borderRadius: 14,

    backgroundColor: colors.white,

    alignItems: "center",
    justifyContent: "center",

    shadowColor: colors.black,
    shadowOpacity: 0.09,
    shadowRadius: 8,

    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 3,
  },

  notificationDot: {
    position: "absolute",

    width: 8,
    height: 8,

    borderRadius: 4,

    backgroundColor: colors.danger,

    right: 8,
    top: 8,

    borderWidth: 1.5,
    borderColor: colors.white,
  },

  titleContainer: {
    marginTop: spacing.xxl,
  },

  eyebrow: {
    color: colors.pink,

    fontSize: 10,

    fontWeight: "800",

    letterSpacing: 1.5,

    textTransform: "uppercase",
  },

  title: {
    color: colors.white,

    fontSize: 28,

    lineHeight: 34,

    fontWeight: "900",

    marginTop: spacing.xs,
  },

  subtitle: {
    color: "#E7DCF9",

    fontSize: 12,

    lineHeight: 18,

    marginTop: spacing.sm,

    maxWidth: 350,
  },

  scroll: {
    flex: 1,
  },

  content: {
    paddingHorizontal: spacing.lg,

    paddingTop: spacing.lg,

    paddingBottom: 115,
  },

  contentNoNavigation: {
    paddingBottom:
      spacing.xxxl,
  },

  navigation: {
    position: "absolute",

    left: 12,
    right: 12,
    bottom: 12,

    height: 72,

    borderRadius: 24,

    backgroundColor: colors.white,

    flexDirection: "row",

    alignItems: "center",
    justifyContent:
      "space-around",

    paddingHorizontal: 5,

    borderWidth: 1,
    borderColor: colors.border,

    shadowColor: colors.primary,
    shadowOpacity: 0.1,
    shadowRadius: 14,

    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 6,
  },

  tab: {
    flex: 1,

    height: "100%",

    alignItems: "center",
    justifyContent: "center",
  },

  tabIcon: {
    width: 38,
    height: 32,

    borderRadius: 11,

    alignItems: "center",
    justifyContent: "center",
  },

  tabIconActive: {
    backgroundColor:
      colors.primary,
  },

  tabText: {
    color: colors.textMuted,

    fontSize: 9,

    fontWeight: "600",

    marginTop: 3,
  },

  tabTextActive: {
    color: colors.primary,

    fontWeight: "800",
  },
});