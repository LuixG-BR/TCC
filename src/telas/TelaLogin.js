import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import {
  HeartPulse,
  UserRound,
  LockKeyhole,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react-native";

import authService from "../services/authService";
import authStorage from "../storage/authStorage";
import notificacoes from "../services/notificacoes";

import { colors } from "../styles/colors";
import { spacing } from "../styles/spacing";
import { typography } from "../styles/typography";

export default function TelaLogin({ setTela }) {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  async function handleLogin() {
    if (!login || !senha) {
      notificacoes.info("Preencha login e senha.");
      return;
    }

    try {
      setCarregando(true);

      const resposta = await authService.login(
        login,
        senha
      );

      await authStorage.salvarToken(
        resposta.access_token
      );

      await authStorage.salvarRefreshToken(
        resposta.refresh_token
      );

      notificacoes.sucesso(
        "Login realizado com sucesso!"
      );

      setTela("inicio");

    } catch (erro) {
      if (erro.response?.status === 401) {
        notificacoes.erro(
          "Login ou senha incorretos."
        );
      } else {
        notificacoes.erro(
          "Não foi possível realizar o login."
        );
      }
    } finally {
      setCarregando(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : undefined
        }
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >

          {/* CABEÇALHO */}

          <View style={styles.header}>
            <View style={styles.circleOne} />
            <View style={styles.circleTwo} />

            <View style={styles.logoContainer}>
              <View style={styles.logoIcon}>
                <HeartPulse
                  size={34}
                  color={colors.white}
                />
              </View>

              <Text style={styles.brand}>
                EMPS
              </Text>

              <Text style={styles.brandSubtitle}>
                Monitoramento inteligente
              </Text>
            </View>

            <View style={styles.welcomeContainer}>
              <Text style={styles.eyebrow}>
                SEU ACOMPANHAMENTO
              </Text>

              <Text style={styles.title}>
                Acesse sua conta
              </Text>

              <Text style={styles.subtitle}>
                Entre com seus dados para acessar o EMPS
                e acompanhar seus monitoramentos.
              </Text>
            </View>
          </View>

          {/* CONTEÚDO */}

          <View style={styles.content}>
            <View style={styles.formCard}>

              <Text style={styles.formTitle}>
                Entrar
              </Text>

              <Text style={styles.formSubtitle}>
                Informe seus dados de acesso.
              </Text>

              {/* LOGIN */}

              <Text style={styles.label}>
                Login
              </Text>

              <View style={styles.inputContainer}>
                <UserRound
                  size={20}
                  color={colors.textMuted}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Digite seu login"
                  placeholderTextColor={
                    colors.textMuted
                  }
                  value={login}
                  onChangeText={setLogin}
                  autoCapitalize="none"
                  editable={!carregando}
                />
              </View>

              {/* SENHA */}

              <Text style={styles.label}>
                Senha
              </Text>

              <View style={styles.inputContainer}>
                <LockKeyhole
                  size={20}
                  color={colors.textMuted}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Digite sua senha"
                  placeholderTextColor={
                    colors.textMuted
                  }
                  value={senha}
                  onChangeText={setSenha}
                  secureTextEntry={!mostrarSenha}
                  editable={!carregando}
                />

                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() =>
                    setMostrarSenha(!mostrarSenha)
                  }
                >
                  {mostrarSenha ? (
                    <EyeOff
                      size={20}
                      color={colors.primary}
                    />
                  ) : (
                    <Eye
                      size={20}
                      color={colors.textMuted}
                    />
                  )}
                </TouchableOpacity>
              </View>

              {/* BOTÃO */}

              <TouchableOpacity
                style={[
                  styles.loginButton,
                  carregando &&
                  styles.loginButtonDisabled,
                ]}
                activeOpacity={0.85}
                onPress={handleLogin}
                disabled={carregando}
              >
                {carregando ? (
                  <ActivityIndicator
                    color={colors.white}
                  />
                ) : (
                  <Text style={styles.loginButtonText}>
                    Entrar
                  </Text>
                )}
              </TouchableOpacity>

              {/* SEGURANÇA */}

              <View style={styles.security}>
                <ShieldCheck
                  size={17}
                  color={colors.success}
                />

                <Text style={styles.securityText}>
                  Seus dados estão protegidos
                </Text>
              </View>

            </View>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  scrollContent: {
    flexGrow: 1,
  },

  /* HEADER */

  header: {
    backgroundColor: colors.primary,

    paddingTop: spacing.xxl,
    paddingHorizontal: spacing.xl,
    paddingBottom: 60,

    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,

    overflow: "hidden",
  },

  circleOne: {
    position: "absolute",

    width: 240,
    height: 240,

    borderRadius: 120,

    backgroundColor: colors.lightPurple,

    opacity: 0.13,

    right: -80,
    top: -80,
  },

  circleTwo: {
    position: "absolute",

    width: 170,
    height: 170,

    borderRadius: 85,

    backgroundColor: colors.pink,

    opacity: 0.1,

    left: -70,
    bottom: -70,
  },

  logoContainer: {
    alignItems: "center",
  },

  logoIcon: {
    width: 64,
    height: 64,

    borderRadius: 20,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor:
      "rgba(255,255,255,0.15)",

    borderWidth: 1,
    borderColor:
      "rgba(255,255,255,0.20)",
  },

  brand: {
    marginTop: spacing.md,

    fontSize: 27,
    fontWeight: "800",

    color: colors.white,

    letterSpacing: 1,
  },

  brandSubtitle: {
    marginTop: 2,

    fontSize: 13,

    color:
      "rgba(255,255,255,0.75)",
  },

  welcomeContainer: {
    marginTop: spacing.xxxl,
  },

  eyebrow: {
    ...typography.label,

    color: colors.pink,

    letterSpacing: 1.2,

    marginBottom: spacing.sm,
  },

  title: {
    ...typography.title,

    color: colors.white,
  },

  subtitle: {
    ...typography.body,

    marginTop: spacing.sm,

    color:
      "rgba(255,255,255,0.78)",

    maxWidth: 330,
  },

  /* CONTEÚDO */

  content: {
    paddingHorizontal: spacing.xl,

    marginTop: -30,

    paddingBottom: spacing.xxxl,
  },

  formCard: {
    backgroundColor: colors.surface,

    borderRadius: 24,

    padding: spacing.xxl,

    borderWidth: 1,
    borderColor: colors.border,

    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.08,
    shadowRadius: 18,

    elevation: 5,
  },

  formTitle: {
    ...typography.h2,

    color: colors.textPrimary,
  },

  formSubtitle: {
    ...typography.body,

    color: colors.textSecondary,

    marginTop: spacing.xs,
    marginBottom: spacing.xxl,
  },

  /* INPUTS */

  label: {
    ...typography.bodyMedium,

    fontWeight: "600",

    color: colors.textPrimary,

    marginBottom: spacing.sm,
  },

  inputContainer: {
    height: 56,

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: spacing.lg,

    backgroundColor: colors.surfaceSoft,

    borderWidth: 1,
    borderColor: colors.border,

    borderRadius: 16,

    marginBottom: spacing.xl,
  },

  input: {
    flex: 1,

    height: "100%",

    marginLeft: spacing.md,

    fontSize: 15,

    color: colors.textPrimary,
  },

  /* BOTÃO */

  loginButton: {
    height: 56,

    marginTop: spacing.sm,

    borderRadius: 16,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: colors.primary,

    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,

    elevation: 4,
  },

  loginButtonDisabled: {
    opacity: 0.65,
  },

  loginButtonText: {
    fontSize: 16,
    fontWeight: "700",

    color: colors.white,
  },

  /* SEGURANÇA */

  security: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    marginTop: spacing.xl,
  },

  securityText: {
    ...typography.small,

    color: colors.textMuted,

    marginLeft: spacing.sm,
  },
});