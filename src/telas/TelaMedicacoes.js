import React from "react";
import { View, Text } from "react-native";
import { Pill } from "lucide-react-native";
import styles from "../styles/styles";
import AppShell from "../componentes/AppShell";
import MedicamentoCard from "../componentes/MedicamentoCard";
export default function TelaMedicacoes({ setTela }) { return <AppShell tela="medicacoes" setTela={setTela} title="Medicações" subtitle="Acompanhe os medicamentos, horários e prescrições do paciente."><View style={styles.sectionHeading}><View style={styles.sectionIcon}><Pill size={21} color="#572EA9" /></View><View><Text style={styles.sectionTitle}>Medicamentos cadastrados</Text><Text style={styles.sectionDescription}>Controle organizado dos horários de uso</Text></View></View><View style={styles.cardsGrid}><MedicamentoCard nome="Carbamazepina" dose="400mg – 2x ao dia" hora1="8:00" hora2="20:00" medico="Dr(a) Maria Santos"/><MedicamentoCard nome="Levetiracetam" dose="500mg – 2x ao dia" hora1="8:00" hora2="22:00" medico="Dr(a) Maria Santos"/></View></AppShell>; }
