import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { UserRound, Droplets, CalendarDays, Heart, Plus, Save } from "lucide-react-native";
import styles from "../styles/styles";
import AppShell from "../componentes/AppShell";
import Label from "../componentes/Label";
import Input from "../componentes/Input";

export default function PerfilPaciente({ setTela }) {
  const [tipoSanguineo, setTipoSanguineo] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [calendarioNascimento, setCalendarioNascimento] = useState(false);
  const formatarData = (date) => `${String(date.getDate()).padStart(2,"0")}/${String(date.getMonth()+1).padStart(2,"0")}/${date.getFullYear()}`;

  return <AppShell tela="perfil" setTela={setTela} title="Ficha do paciente" subtitle="Dados médicos e informações pessoais organizados de forma simples e segura.">
    <View style={styles.contentCard}>
      <View style={styles.sectionHeading}><View style={styles.sectionIcon}><UserRound size={21} color="#572EA9" /></View><View><Text style={styles.sectionTitle}>Dados pessoais</Text><Text style={styles.sectionDescription}>Informações básicas do paciente</Text></View></View>
      <View style={styles.formGrid}>
        <View style={styles.formField}><Label text="Nome completo" /><Input placeholder="Digite o nome completo" /></View>
        <View style={styles.formField}><Label text="Tipo sanguíneo" /><View style={styles.pickerContainer}><Picker selectedValue={tipoSanguineo} onValueChange={setTipoSanguineo} style={styles.picker}><Picker.Item label="Selecione" value="" /><Picker.Item label="A+" value="A+" /><Picker.Item label="A-" value="A-" /><Picker.Item label="B+" value="B+" /><Picker.Item label="B-" value="B-" /><Picker.Item label="AB+" value="AB+" /><Picker.Item label="AB-" value="AB-" /><Picker.Item label="O+" value="O+" /><Picker.Item label="O-" value="O-" /></Picker></View></View>
        <View style={styles.formField}><Label text="Data de nascimento" /><TouchableOpacity style={styles.inputIcon} onPress={() => setCalendarioNascimento(true)}><Text style={styles.dateText}>{dataNascimento || "dd/mm/aaaa"}</Text><CalendarDays size={20} color="#764EC7" /></TouchableOpacity></View>
      </View>
    </View>

    <View style={styles.contentCard}>
      <View style={styles.sectionHeading}><View style={styles.sectionIcon}><Heart size={21} color="#572EA9" /></View><View><Text style={styles.sectionTitle}>Alergias e observações</Text><Text style={styles.sectionDescription}>Informações importantes para o acompanhamento</Text></View></View>
      <View style={styles.formGrid}><View style={styles.formField}><Label text="Adicionar alergia" /><Input placeholder="Digite a alergia" /></View><View style={styles.formField}><Label text="Observações médicas" /><View style={styles.row}><TextInput style={styles.obsInput} placeholder="Digite observações" /><TouchableOpacity style={styles.addButton}><Plus size={20} color="#FFFFFF" /></TouchableOpacity></View></View></View>
      <TouchableOpacity style={styles.saveButton}><Save size={19} color="#FFFFFF" /><Text style={styles.saveText}>Salvar alterações</Text></TouchableOpacity>
    </View>
    <DateTimePickerModal isVisible={calendarioNascimento} mode="date" onConfirm={(date)=>{setDataNascimento(formatarData(date));setCalendarioNascimento(false)}} onCancel={()=>setCalendarioNascimento(false)} />
  </AppShell>;
}
