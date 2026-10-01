import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
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

import medicamentoService from "../services/medicamentoService";
import usuarioService from "../services/usuarioService";

import { colors } from "../styles/colors";
import { spacing } from "../styles/spacing";

export default function TelaMedicacoes({ tela, setTela }) {
  const [medicamentos, setMedicamentos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    let ativo = true;

    async function carregarMedicamentos() {
      try {
        const usuario =
          await usuarioService.buscarUsuarioLogado();

        const idPaciente = usuario?.dados?.id_paciente;

        if (!Number.isInteger(idPaciente) || idPaciente <= 0) {
          throw new Error(
            "O usuário logado não possui um ID de paciente válido."
          );
        }

        const lista =
          await medicamentoService.listarPorPaciente(idPaciente);

        if (!Array.isArray(lista)) {
          throw new Error(
            "A API retornou uma lista de medicamentos inválida."
          );
        }

        if (ativo) {
          setMedicamentos(lista);
        }
      } catch (erroRequisicao) {
        if (!ativo) return;

        const status = erroRequisicao.response?.status;

        if (status === 401) {
          setErro("Sua sessão expirou. Entre novamente.");
        } else if (status === 403) {
          setErro(
            "Você não possui permissão para consultar os medicamentos."
          );
        } else if (erroRequisicao.response) {
          setErro("Não foi possível carregar os medicamentos.");
        } else if (erroRequisicao.request) {
          setErro(
            "Não foi possível conectar à API. Verifique sua conexão."
          );
        } else {
          setErro(
            erroRequisicao.message ||
              "Não foi possível carregar os medicamentos."
          );
        }
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    carregarMedicamentos();

    return () => {
      ativo = false;
    };
  }, []);

  const medicamentosComHorario = medicamentos.filter(
    (medicamento) =>
      medicamento.status &&
      medicamento.horario?.trim()
  );

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

      {carregando ? (
        <Card>
          <ActivityIndicator
            size="large"
            color={colors.primary}
          />

          <Text style={styles.scheduleSubtitle}>
            Carregando medicamentos...
          </Text>
        </Card>
      ) : erro ? (
        <Card>
          <Text style={styles.scheduleTitle}>
            {erro}
          </Text>
        </Card>
      ) : (
        <>
          {medicamentos.length === 0 ? (
            <Card>
              <Text style={styles.scheduleTitle}>
                Nenhum medicamento cadastrado.
              </Text>
            </Card>
          ) : (
            medicamentos.map((medicamento) => (
              <MedicamentoCard
                key={medicamento.id_medicamento}
                nome={medicamento.nome}
                dosagem={medicamento.dosagem}
                frequencia={medicamento.frequencia}
                horario={medicamento.horario}
                observacao={medicamento.observacao}
                status={medicamento.status}
              />
            ))
          )}

          <SectionHeader
            icon={CalendarDays}
            title="Horários cadastrados"
            subtitle="Horários dos medicamentos ativos"
          />

          <Card>
            {medicamentosComHorario.length === 0 ? (
              <Text style={styles.scheduleSubtitle}>
                Nenhum horário cadastrado para medicamentos ativos.
              </Text>
            ) : (
              medicamentosComHorario.map((medicamento, indice) => (
                <View key={medicamento.id_medicamento}>
                  {indice > 0 && (
                    <View style={styles.separator} />
                  )}

                  <View style={styles.scheduleRow}>
                    <View style={styles.timeBox}>
                      <Text style={styles.time}>
                        {medicamento.horario}
                      </Text>
                    </View>

                    <View style={styles.scheduleInfo}>
                      <Text style={styles.scheduleTitle}>
                        {medicamento.nome}
                      </Text>

                      <Text style={styles.scheduleSubtitle}>
                        {medicamento.dosagem}
                      </Text>
                    </View>

                    <Clock3
                      size={18}
                      color={colors.primary}
                    />
                  </View>
                </View>
              ))
            )}
          </Card>
        </>
      )}

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
            Mantenha os horários e doses sempre atualizados para
            facilitar o acompanhamento do paciente.
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