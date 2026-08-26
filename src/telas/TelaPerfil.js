import React, { useEffect, useState } from "react";

import usuarioService from "../services/usuarioService";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import {
  UserRound,
  CalendarDays,
  Droplets,
  Phone,
  MapPin,
  HeartPulse,
  ShieldAlert,
  Stethoscope,
} from "lucide-react-native";

import AppShell from "../componentes/AppShell";
import Card from "../componentes/Card";
import SectionHeader from "../componentes/SectionHeader";
import StatusBadge from "../componentes/StatusBadge";

import { colors } from "../styles/colors";
import { spacing } from "../styles/spacing";

export default function TelaPerfil({
  tela,
  setTela,
}) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {

    async function carregarUsuario() {

      try {

        const dados =
          await usuarioService.buscarUsuarioLogado();

        console.log("Dados da API:", dados);

        setUsuario(dados);

      } catch (erro) {

        console.error(
          "Erro ao carregar usuário:",
          erro.response?.data || erro.message
        );

        setErro(
          "Não foi possível carregar os dados."
        );

      } finally {

        setCarregando(false);

      }
    }

    carregarUsuario();

  }, []);

  if (carregando) {
    return (
      <AppShell
        tela={tela}
        setTela={setTela}
        title="Perfil"
      >
        <Text>Carregando dados...</Text>
      </AppShell>
    );
  }

  if (erro) {
    return (
      <AppShell
        tela={tela}
        setTela={setTela}
        title="Perfil"
      >
        <Text>{erro}</Text>
      </AppShell>
    );
  }

  return (
    <AppShell
      tela={tela}
      setTela={setTela}
      eyebrow="Dados do paciente"
      title="Perfil do paciente"
      subtitle="Consulte as principais informações pessoais e médicas cadastradas."
    >
      {/* CARD PRINCIPAL */}

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <UserRound
            size={34}
            color={colors.white}
          />
        </View>

        <View style={styles.profileInfo}>
          <Text style={styles.profileLabel}>
            PACIENTE
          </Text>

          <Text style={styles.profileName}>
            {usuario?.nome || "Usuário"}
          </Text>

          <Text style={styles.profileDescription}>
            Cadastro ativo no sistema EMPS
          </Text>

          <StatusBadge status="normal" text="Ativo" />
        </View>
      </View>

      {/* INFORMAÇÕES PESSOAIS */}

      <SectionHeader
        icon={UserRound}
        title="Informações pessoais"
        subtitle="Dados de identificação do paciente"
      />

      <Card>
        <InfoRow
          icon={CalendarDays}
          label="Data de nascimento"
          value="15/04/2005"
        />

        <Separator />

        <InfoRow
          icon={Droplets}
          label="Tipo sanguíneo"
          value="O+"
        />

        <Separator />

        <InfoRow
          icon={Phone}
          label="Telefone"
          value="(11) 99999-9999"
        />

        <Separator />

        <InfoRow
          icon={MapPin}
          label="Endereço"
          value="São Paulo - SP"
        />
      </Card>

      {/* DADOS MÉDICOS */}

      <SectionHeader
        icon={HeartPulse}
        title="Informações médicas"
        subtitle="Dados relevantes para o acompanhamento"
      />

      <Card>
        <View style={styles.medicalHighlight}>
          <View style={styles.medicalIcon}>
            <HeartPulse
              size={24}
              color={colors.primary}
            />
          </View>

          <View style={styles.medicalText}>
            <Text style={styles.medicalLabel}>
              Condição acompanhada
            </Text>

            <Text style={styles.medicalValue}>
              Epilepsia
            </Text>
          </View>
        </View>

        <Separator />

        <InfoRow
          icon={Stethoscope}
          label="Médico responsável"
          value="Dr(a). Maria Santos"
        />
      </Card>

      {/* CONTATO DE EMERGÊNCIA */}

      <SectionHeader
        icon={ShieldAlert}
        title="Contato de emergência"
        subtitle="Pessoa responsável em situações de atenção"
      />

      <View style={styles.emergencyCard}>
        <View style={styles.emergencyTop}>
          <View style={styles.emergencyIcon}>
            <Phone
              size={22}
              color={colors.danger}
            />
          </View>

          <View style={styles.emergencyInfo}>
            <Text style={styles.emergencyName}>
              João Silva
            </Text>

            <Text style={styles.emergencyRelation}>
              Familiar responsável
            </Text>
          </View>
        </View>

        <View style={styles.emergencyPhoneBox}>
          <Text style={styles.emergencyPhoneLabel}>
            Telefone para contato
          </Text>

          <Text style={styles.emergencyPhone}>
            (11) 98888-7777
          </Text>
        </View>
      </View>
    </AppShell>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoIcon}>
        <Icon
          size={18}
          color={colors.primary}
        />
      </View>

      <View style={styles.infoContent}>
        <Text style={styles.infoLabel}>
          {label}
        </Text>

        <Text style={styles.infoValue}>
          {value}
        </Text>
      </View>
    </View>
  );
}

function Separator() {
  return (
    <View style={styles.separator} />
  );
}

const styles = StyleSheet.create({
  profileCard: {
    backgroundColor: colors.primaryDark,

    borderRadius: 22,

    padding: spacing.lg,

    flexDirection: "row",
    alignItems: "center",

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

  avatar: {
    width: 72,
    height: 72,

    borderRadius: 22,

    backgroundColor: "rgba(255,255,255,0.15)",

    alignItems: "center",
    justifyContent: "center",

    marginRight: spacing.lg,
  },

  profileInfo: {
    flex: 1,
  },

  profileLabel: {
    color: colors.pink,

    fontSize: 9,

    fontWeight: "800",

    letterSpacing: 1.3,
  },

  profileName: {
    color: colors.white,

    fontSize: 20,

    fontWeight: "900",

    marginTop: 3,
  },

  profileDescription: {
    color: "#DDD1F1",

    fontSize: 10,

    lineHeight: 15,

    marginTop: 3,
    marginBottom: spacing.sm,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  infoIcon: {
    width: 42,
    height: 42,

    borderRadius: 13,

    backgroundColor: colors.soft,

    alignItems: "center",
    justifyContent: "center",

    marginRight: spacing.md,
  },

  infoContent: {
    flex: 1,
  },

  infoLabel: {
    color: colors.textMuted,

    fontSize: 10,
  },

  infoValue: {
    color: colors.textPrimary,

    fontSize: 13,

    fontWeight: "800",

    marginTop: 3,
  },

  separator: {
    height: 1,

    backgroundColor: colors.border,

    marginVertical: spacing.lg,
  },

  medicalHighlight: {
    flexDirection: "row",
    alignItems: "center",
  },

  medicalIcon: {
    width: 52,
    height: 52,

    borderRadius: 16,

    backgroundColor: colors.primaryLight,

    alignItems: "center",
    justifyContent: "center",

    marginRight: spacing.md,
  },

  medicalText: {
    flex: 1,
  },

  medicalLabel: {
    color: colors.textMuted,

    fontSize: 10,
  },

  medicalValue: {
    color: colors.primary,

    fontSize: 18,

    fontWeight: "900",

    marginTop: 3,
  },

  emergencyCard: {
    backgroundColor: colors.dangerBackground,

    borderRadius: 20,

    padding: spacing.lg,

    borderWidth: 1,
    borderColor: "#F5D5DB",

    marginBottom: spacing.xl,
  },

  emergencyTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  emergencyIcon: {
    width: 46,
    height: 46,

    borderRadius: 14,

    backgroundColor: colors.white,

    alignItems: "center",
    justifyContent: "center",

    marginRight: spacing.md,
  },

  emergencyInfo: {
    flex: 1,
  },

  emergencyName: {
    color: colors.textPrimary,

    fontSize: 15,

    fontWeight: "900",
  },

  emergencyRelation: {
    color: colors.textSecondary,

    fontSize: 10,

    marginTop: 3,
  },

  emergencyPhoneBox: {
    backgroundColor: colors.white,

    borderRadius: 14,

    padding: spacing.md,

    marginTop: spacing.lg,
  },

  emergencyPhoneLabel: {
    color: colors.textMuted,

    fontSize: 9,
  },

  emergencyPhone: {
    color: colors.danger,

    fontSize: 15,

    fontWeight: "900",

    marginTop: 3,
  },
});