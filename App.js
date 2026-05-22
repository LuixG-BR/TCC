import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";

import { Picker } from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import {
  Menu,
  Home,
  User,
  Stethoscope,
  BriefcaseMedical,
  Heart,
  Save,
  Plus,
  CalendarDays,
  ChevronDown,
  Clock,
  Shield,
  Brain,
  ClipboardList,
  Target,
  Syringe,
} from "lucide-react-native";

export default function App() {
  const [tela, setTela] = useState("inicio");

  if (tela === "perfil") {
    return <PerfilPaciente setTela={setTela} />;
  }

  if (tela === "menu") {
    return <TelaMenu setTela={setTela} />;
  }

  if (tela === "medicacoes") {
    return <TelaMedicacoes setTela={setTela} />;
  }
  
  if (tela === "crise") {
    return <TelaRegistrarCrise setTela={setTela} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.topCircle} />

      <TouchableOpacity style={styles.menu} onPress={() => setTela("menu")}>
        <Menu size={28} color="#111" />
      </TouchableOpacity>

      <Text style={styles.logoInicio}>EMPS</Text>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => setTela("perfil")}
      >
        <Text style={styles.loginText}>Fazer Login</Text>
      </TouchableOpacity>

      <View style={styles.bottomCircle}>
        <Text style={styles.connectionText}>FAZER CONEXÃO</Text>
      </View>
    </View>
  );
}

function TelaMenu({ setTela }) {
  return (
    <View style={styles.menuContainer}>
      <Text style={styles.menuTitulo}>Menu</Text>

      <TouchableOpacity style={styles.menuButton} onPress={() => setTela("inicio")}>
        <Text style={styles.menuButtonText}>Tela Inicial</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuButton} onPress={() => setTela("perfil")}>
        <Text style={styles.menuButtonText}>Perfil do Paciente</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuButton} onPress={() => setTela("medicacoes")}>
        <Text style={styles.menuButtonText}>Medicações</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => setTela("crise")}
      >
        <Text style={styles.menuButtonText}>Registrar Crise</Text>
       </TouchableOpacity>
    </View>
  );
}

// ================= TELA MEDICAÇÕES =================

function TelaMedicacoes({ setTela }) {
  return (
    <View style={styles.medicContainer}>
      <View style={styles.medicHeaderCircle} />

      <View style={styles.topIconsMedic}>
        <TouchableOpacity onPress={() => setTela("inicio")}>
          <Home size={30} color="#111" strokeWidth={2.2} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setTela("menu")}>
          <Menu size={34} color="#111" strokeWidth={2.2} />
        </TouchableOpacity>
      </View>

      <View style={styles.medicTitleBox}>
        <Text style={styles.medicTitle}>Medicações</Text>

        <Text style={styles.medicSubtitle}>
          Gerencie seus medicamentos
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 150 }}
      >
        <MedicamentoCard
          nome="Carbamazepina"
          dose="400mg – 2x ao dia"
          hora1="8:00"
          hora2="20:00"
          medico="Dr(a) Maria Santos"
        />

        <MedicamentoCard
          nome="Levetiracetam"
          dose="500mg – 2x ao dia"
          hora1="8:00"
          hora2="22:00"
          medico="Dr(a) Maria Santos"
        />
      </ScrollView>

      <View style={styles.medicFooter}>
        <Text style={styles.footerLogo}>EMPS</Text>

        <Text style={styles.footerText}>
          Cuidando da sua saúde, conectando vidas.
        </Text>
      </View>
    </View>
  );
}

// ================= CARD =================

function MedicamentoCard({
  nome,
  dose,
  hora1,
  hora2,
  medico,
}) {
  return (
    <View style={styles.cardShadow}>
      <View style={styles.medicCard}>
        <View style={styles.cardTop}>
          <View style={styles.remedioIcon}>
            <Text style={styles.remedioEmoji}>💊</Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.nomeMedicamento}>
              {nome}
            </Text>

            <Text style={styles.doseMedicamento}>
              {dose}
            </Text>
          </View>

          <TouchableOpacity>
            <Stethoscope
              size={20}
              color="#111"
              strokeWidth={2.3}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.horariosRow}>
          <View style={styles.horarioBox}>
            <Text style={styles.horarioText}>
              ◷ {hora1}
            </Text>
          </View>

          <View style={styles.horarioBox}>
            <Text style={styles.horarioText}>
              ◷ {hora2}
            </Text>
          </View>
        </View>

        <View style={styles.cardBottom}>
          <Text style={styles.medicoText}>
            ⚕ {medico}
          </Text>

          <TouchableOpacity>
            <Heart
              size={18}
              color="#777"
              strokeWidth={2}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// ================= REGISTRAR CRISE =================

function TelaRegistrarCrise({ setTela }) {
  const gatilhos = [
    "Estresse",
    "Falta de Sono",
    "Álcool",
    "Calor Excessivo",
    "Luzes Intermitentes",
    "Febre",
  ];

  const sintomas = [
    "Aura Visual",
    "Formigamento",
    "Náusea",
    "Contrações Musculares",
  ];

  return (
    <View style={styles.criseContainer}>
      <View style={styles.criseHeaderCircle} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View style={styles.criseTopIcons}>
          <TouchableOpacity onPress={() => setTela("inicio")}>
            <Home size={25} color="#111" />
          </TouchableOpacity>

          <ChevronDown size={30} color="#111" />

          <TouchableOpacity onPress={() => setTela("menu")}>
            <Menu size={30} color="#111" />
          </TouchableOpacity>
        </View>

        <View style={styles.criseHeaderText}>
          <Text style={styles.criseTitulo}>Registrar Crise</Text>
          <Text style={styles.criseSubtitulo}>
            Preencha os Dados do Episódio Epiléptico
          </Text>
        </View>

        <View style={styles.criseSection}>
          <View style={styles.criseSectionRow}>
            <View style={styles.criseIcon}>
              <BriefcaseMedical size={25} color="#111" />
            </View>
            <Text style={styles.criseSectionTitle}>Informações da crise</Text>
          </View>

          <Text style={styles.criseLabel}>Tipo de Crise</Text>
          <View style={styles.crisePickerBox}>
            <Text style={styles.crisePlaceholder}>Selecione o tipo de crise</Text>
            <ChevronDown size={18} color="#555" />
          </View>

          <View style={styles.criseDateRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.criseLabel}>Data</Text>
              <View style={styles.criseSmallInput}>
                <Text style={styles.criseSmallText}>29/05/2026</Text>
                <CalendarDays size={17} color="#111" />
              </View>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.criseLabel}>Hora</Text>
              <View style={styles.criseSmallInput}>
                <Text style={styles.criseSmallText}>13:30</Text>
                <Clock size={17} color="#111" />
              </View>
            </View>
          </View>

          <Text style={styles.criseLabel}>Local</Text>
          <TextInput style={styles.criseLocalInput} placeholder="Casa" />

          <View style={styles.criseSectionRow}>
            <View style={styles.criseIcon}>
              <Shield size={28} color="#111" />
            </View>
            <Text style={styles.criseSectionTitle}>Severidade</Text>
          </View>

          <View style={styles.severidadeRow}>
            <TouchableOpacity style={styles.severidadeButton}>
              <Text style={styles.severidadeText}>Leve</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.severidadeButton}>
              <Text style={styles.severidadeText}>Moderada</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.severidadeButton}>
              <Text style={styles.severidadeText}>Grave</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.criseSectionRow}>
            <View style={styles.criseIcon}>
              <Clock size={26} color="#111" />
            </View>
            <Text style={styles.criseSectionTitle}>Duração(Segundos)</Text>
          </View>

          <TextInput style={styles.criseInputNormal} placeholder="120" />

          <View style={styles.criseSectionRow}>
            <View style={styles.criseIcon}>
              <Brain size={26} color="#111" />
            </View>
            <Text style={styles.criseSectionTitle}>Nível de Consciência</Text>
          </View>

          <View style={styles.crisePickerBox}>
            <Text style={styles.crisePlaceholder}>Reduzida</Text>
            <ChevronDown size={18} color="#555" />
          </View>

          <View style={styles.criseSectionRow}>
            <View style={styles.criseIcon}>
              <Target size={26} color="#111" />
            </View>
            <Text style={styles.criseSectionTitle}>Possíveis Gatilhos</Text>
          </View>

          <View style={styles.tagsArea}>
            {gatilhos.map((item, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{item}</Text>
              </View>
            ))}
          </View>

          <View style={styles.gatilhoRow}>
            <TextInput
              style={styles.gatilhoInput}
              placeholder="Adicionar Gatilho Personalizado"
            />
            <TouchableOpacity style={styles.addButton}>
              <Plus size={22} color="#111" />
            </TouchableOpacity>
          </View>

          <View style={styles.criseSectionRow}>
            <View style={styles.criseIcon}>
              <Heart size={26} color="#111" />
            </View>
            <Text style={styles.criseSectionTitle}>Sintomas</Text>
          </View>

          <Text style={styles.criseLabel}>Antes da Crise (Aura)</Text>
          <View style={styles.tagsArea}>
            {sintomas.map((item, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{item}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.entreOutros}>Entre Outros...</Text>

          <Text style={styles.criseLabel}>Durante a Crise</Text>
          <View style={styles.tagsArea}>
            {sintomas.map((item, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{item}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.entreOutros}>Entre Outros...</Text>

          <View style={styles.setaBaixo}>
            <ChevronDown size={32} color="#111" />
          </View>

          <Text style={styles.criseLabel}>Após a Crise (Pós-Ictal)</Text>
          <View style={styles.tagsArea}>
            {sintomas.map((item, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{item}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.entreOutros}>Entre Outros...</Text>

          <View style={styles.criseSectionRow}>
            <View style={styles.criseIcon}>
              <ClipboardList size={26} color="#111" />
            </View>
            <Text style={styles.criseSectionTitle}>Ações Realizadas</Text>
          </View>

          <View style={styles.acaoRow}>
            <View style={styles.switchOff}>
              <View style={styles.switchBall} />
            </View>
            <Text style={styles.acaoText}>Emergência Acionada</Text>
          </View>

          <View style={styles.acaoRow}>
            <View style={styles.switchOff}>
              <View style={styles.switchBall} />
            </View>
            <Text style={styles.acaoText}>
              Medicação de Resgate{"\n"}Administrada
            </Text>
          </View>

          <Text style={styles.criseLabel}>Observações</Text>
          <TextInput
            multiline
            placeholder="Notas adicionais sobre a crise"
            style={styles.criseObs}
          />

          <TouchableOpacity style={styles.criseSalvar}>
            <Save size={27} color="#111" />
            <Text style={styles.criseSalvarText}>Salvar Perfil</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.criseFooter}>
          <Text style={styles.footerLogo}>EMPS</Text>
          <Text style={styles.footerText}>
            Cuidando da sua saúde, conectando vidas.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}


function PerfilPaciente({ setTela }) {
  const [tipoSanguineo, setTipoSanguineo] = useState("");

  const [dataNascimento, setDataNascimento] = useState("");
  const [dataDiagnostico, setDataDiagnostico] = useState("");

  const [calendarioNascimento, setCalendarioNascimento] = useState(false);
  const [calendarioDiagnostico, setCalendarioDiagnostico] = useState(false);

  function formatarData(date) {
    const dia = String(date.getDate()).padStart(2, "0");
    const mes = String(date.getMonth() + 1).padStart(2, "0");
    const ano = date.getFullYear();

    return `${dia}/${mes}/${ano}`;
  }

  return (
    <View style={styles.perfilContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerCircle} />

        <View style={styles.topIcons}>
          <TouchableOpacity onPress={() => setTela("inicio")}>
            <Home size={28} color="#111" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setTela("menu")}>
            <Menu size={32} color="#111" />
          </TouchableOpacity>
        </View>

        <View style={styles.headerText}>
          <Text style={styles.logoPerfil}>EMPS</Text>
          <Text style={styles.subtitulo}>
            Dados médicos e informações pessoais
          </Text>
        </View>

        <SectionTitle
          icon={<User size={34} color="#111" />}
          title="Dados Pessoais"
          blue
        />

        <Label text="Nome Completo" />
        <Input placeholder="Digite o Nome Completo" />

        <Label text="Tipo Sanguíneo" />

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={tipoSanguineo}
            onValueChange={(itemValue) => setTipoSanguineo(itemValue)}
            style={styles.picker}
            dropdownIconColor="#111"
          >
            <Picker.Item label="Selecione o Tipo Sanguíneo" value="" />
            <Picker.Item label="A+" value="A+" />
            <Picker.Item label="A-" value="A-" />
            <Picker.Item label="B+" value="B+" />
            <Picker.Item label="B-" value="B-" />
            <Picker.Item label="AB+" value="AB+" />
            <Picker.Item label="AB-" value="AB-" />
            <Picker.Item label="O+" value="O+" />
            <Picker.Item label="O-" value="O-" />
          </Picker>
        </View>

        <Label text="Data de Nascimento" />

        <TouchableOpacity
          style={styles.inputIcon}
          onPress={() => setCalendarioNascimento(true)}
        >
          <Text style={styles.dateText}>
            {dataNascimento || "dd/mm/aaaa"}
          </Text>
          <CalendarDays size={24} color="#111" />
        </TouchableOpacity>

        <SectionTitle
          icon={<Stethoscope size={34} color="#111" />}
          title="Diagnóstico"
          blue
        />

        <Label text="Diagnóstico" />
        <Input placeholder="Digite o diagnóstico completo" />

        <Label text="Data do Diagnóstico" />

        <TouchableOpacity
          style={styles.inputIcon}
          onPress={() => setCalendarioDiagnostico(true)}
        >
          <Text style={styles.dateText}>
            {dataDiagnostico || "dd/mm/aaaa"}
          </Text>
          <CalendarDays size={24} color="#111" />
        </TouchableOpacity>

        <View style={styles.arrowDown}>
          <ChevronDown size={38} color="#111" />
        </View>

        <SectionTitle
          icon={<BriefcaseMedical size={30} color="#111" />}
          title="Equipe Médica"
          blue
        />

        <Label text="Neurologista" />
        <Input placeholder="Nome do neurologista" />

        <Label text="Hospital de Referência" />
        <Input placeholder="Nome do hospital" />

        <Label text="Telefone do Neurologista" />
        <Input placeholder="(00) 00000-0000" />

        <SectionTitle
          icon={<Heart size={36} color="#E84242" />}
          title="Alergias"
          red
        />

        <Label text="Adicionar Alergia" />
        <Input placeholder="" />

        <Label text="Observações Médicas" />

        <View style={styles.row}>
          <TextInput style={styles.obsInput} />
          <Plus size={34} color="#111" />
        </View>

        <TouchableOpacity style={styles.saveButton}>
          <Save size={30} color="#111" />
          <Text style={styles.saveText}>Salvar Perfil</Text>
        </TouchableOpacity>

        <View style={styles.footerCircle}>
          <Text style={styles.footerLogo}>EMPS</Text>
          <Text style={styles.footerText}>
            Cuidando da sua saúde, conectando vidas.
          </Text>
        </View>
      </ScrollView>

      <DateTimePickerModal
        isVisible={calendarioNascimento}
        mode="date"
        onConfirm={(date) => {
          setDataNascimento(formatarData(date));
          setCalendarioNascimento(false);
        }}
        onCancel={() => setCalendarioNascimento(false)}
      />

      <DateTimePickerModal
        isVisible={calendarioDiagnostico}
        mode="date"
        onConfirm={(date) => {
          setDataDiagnostico(formatarData(date));
          setCalendarioDiagnostico(false);
        }}
        onCancel={() => setCalendarioDiagnostico(false)}
      />
    </View>
  );
}

function SectionTitle({ icon, title, blue, red }) {
  return (
    <View style={styles.section}>
      <View
        style={[
          styles.iconCircle,
          blue && { backgroundColor: "#C9F3FA" },
          red && { backgroundColor: "#FFB6B6" },
        ]}
      >
        {icon}
      </View>

      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
}

function Label({ text }) {
  return <Text style={styles.label}>{text}</Text>;
}

function Input({ placeholder }) {
  return <TextInput style={styles.input} placeholder={placeholder} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    overflow: "hidden",
  },

  topCircle: {
    position: "absolute",
    top: -210,
    width: 430,
    height: 430,
    borderRadius: 215,
    backgroundColor: "#C9F3FA",
  },

  menu: {
    position: "absolute",
    top: 18,
    right: 18,
    zIndex: 10,
  },

  logoInicio: {
    marginTop: 345,
    fontSize: 24,
    fontWeight: "bold",
    color: "#8BE8F5",
    fontFamily: "serif",
  },

  loginButton: {
    marginTop: 135,
    backgroundColor: "#C9F3FA",
    paddingVertical: 14,
    paddingHorizontal: 35,
    borderRadius: 30,
  },

  loginText: {
    fontSize: 24,
    color: "#000",
  },

  bottomCircle: {
    position: "absolute",
    bottom: -155,
    width: 360,
    height: 250,
    borderRadius: 180,
    backgroundColor: "#29395E",
    alignItems: "center",
    paddingTop: 45,
  },

  connectionText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  menuContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    gap: 20,
  },

  menuTitulo: {
    fontSize: 30,
    fontWeight: "bold",
  },

  menuButton: {
    backgroundColor: "#C9F3FA",
    width: 250,
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
  },

  menuButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },

  perfilContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },

  headerCircle: {
    position: "absolute",
    top: -130,
    width: 430,
    height: 300,
    borderBottomLeftRadius: 220,
    borderBottomRightRadius: 220,
    backgroundColor: "#C9F3FA",
    alignSelf: "center",
  },

  topIcons: {
    marginTop: 20,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  headerText: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 55,
  },

  logoPerfil: {
    color: "#8BE8F5",
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "serif",
  },

  subtitulo: {
    fontSize: 12,
    color: "#111",
  },

  section: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 13,
    marginTop: 20,
    marginBottom: 10,
  },

  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 18,
  },

  sectionTitle: {
    fontSize: 22,
    color: "#111",
  },

  label: {
    fontSize: 18,
    marginLeft: 13,
    marginBottom: 5,
  },

  input: {
    height: 46,
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 6,
    marginHorizontal: 13,
    paddingHorizontal: 12,
    marginBottom: 10,
    fontSize: 16,
  },

  inputIcon: {
    height: 46,
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 6,
    marginHorizontal: 13,
    paddingHorizontal: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  dateText: {
    flex: 1,
    fontSize: 16,
    color: "#111",
  },

  pickerContainer: {
    height: 46,
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 6,
    marginHorizontal: 13,
    marginBottom: 10,
    justifyContent: "center",
    overflow: "hidden",
  },

  picker: {
    height: 46,
    width: "100%",
    backgroundColor: "#fff",
  },

  arrowDown: {
    alignItems: "center",
    marginVertical: 40,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 13,
  },

  obsInput: {
    flex: 1,
    height: 46,
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 6,
    paddingHorizontal: 12,
    fontSize: 16,
  },

  saveButton: {
    marginTop: 65,
    alignSelf: "center",
    backgroundColor: "#C9F3FA",
    width: 255,
    height: 58,
    borderRadius: 35,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },

  saveText: {
    fontSize: 20,
    fontStyle: "italic",
  },

  footerCircle: {
    marginTop: 50,
    alignSelf: "center",
    width: 360,
    height: 130,
    borderTopLeftRadius: 180,
    borderTopRightRadius: 180,
    backgroundColor: "#3A5A7A",
    alignItems: "center",
    paddingTop: 25,
  },

  footerLogo: {
    color: "#8BE8F5",
    fontSize: 28,
    fontWeight: "bold",
    fontFamily: "serif",
  },

  footerText: {
    color: "#fff",
    fontSize: 12,
  },

  // ================= ESTILO MEDICAÇÕES =================

medicContainer: {
  flex: 1,
  backgroundColor: "#F4F4F4",
},

medicHeaderCircle: {
  position: "absolute",
  top: -150,
  alignSelf: "center",
  width: 500,
  height: 360,
  borderBottomLeftRadius: 260,
  borderBottomRightRadius: 260,
  backgroundColor: "#D8F8FF",
},

topIconsMedic: {
  marginTop: 10,
  marginHorizontal: 18,
  flexDirection: "row",
  justifyContent: "space-between",
  zIndex: 10,
},

medicTitleBox: {
  alignItems: "center",
  marginTop: 75,
  marginBottom: 38,
},

medicTitle: {
  fontSize: 34,
  fontWeight: "900",
  color: "#000",
},

medicSubtitle: {
  fontSize: 15,
  color: "#555",
  marginTop: -2,
},

cardShadow: {
  marginHorizontal: 18,
  marginBottom: 28,
  backgroundColor: "#D7D7D7",
  borderRadius: 30,
  paddingBottom: 10,
  paddingRight: 8,
},

medicCard: {
  backgroundColor: "#FFF",
  borderRadius: 30,
  padding: 18,
  minHeight: 190,
},

cardTop: {
  flexDirection: "row",
  alignItems: "center",
},

remedioIcon: {
  width: 56,
  height: 56,
  borderRadius: 28,
  backgroundColor: "#D8F8FF",
  alignItems: "center",
  justifyContent: "center",
  marginRight: 14,
},

remedioEmoji: {
  fontSize: 30,
},

nomeMedicamento: {
  fontSize: 21,
  color: "#111",
  fontWeight: "500",
},

doseMedicamento: {
  fontSize: 15,
  color: "#666",
  marginTop: 2,
},

horariosRow: {
  flexDirection: "row",
  marginTop: 28,
  gap: 14,
},

horarioBox: {
  borderWidth: 1.5,
  borderColor: "#D8F8FF",
  borderRadius: 12,
  paddingVertical: 10,
  paddingHorizontal: 18,
  backgroundColor: "#fff",
},

horarioText: {
  fontSize: 16,
  color: "#111",
},

cardBottom: {
  marginTop: 35,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
},

medicoText: {
  fontSize: 14,
  color: "#666",
},

medicFooter: {
  position: "absolute",
  bottom: -10,
  alignSelf: "center",
  width: 400,
  height: 115,
  borderTopLeftRadius: 220,
  borderTopRightRadius: 220,
  backgroundColor: "#2E557E",
  alignItems: "center",
  justifyContent: "center",
},

footerLogo: {
  color: "#BDF6FF",
  fontSize: 32,
  fontWeight: "bold",
  fontFamily: "serif",
},

footerText: {
  color: "#fff",
  fontSize: 12,
  marginTop: 5,
},

// ================= CRISE =================

// ================= CRISE NOVO ESTILO =================

// ================= CRISE COMPACTA =================

criseContainer: {
  flex: 1,
  backgroundColor: "#fff",
},

criseHeaderCircle: {
  position: "absolute",
  top: -130,
  width: 430,
  height: 300,
  borderBottomLeftRadius: 220,
  borderBottomRightRadius: 220,
  backgroundColor: "#C9F3FA",
  alignSelf: "center",
},

criseTopIcons: {
  marginTop: 20,
  marginHorizontal: 20,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  zIndex: 10,
},

criseHeaderText: {
  alignItems: "center",
  marginTop: 35,
  marginBottom: 50,
},

criseTitulo: {
  fontSize: 24,
  fontWeight: "bold",
  color: "#000",
},

criseSubtitulo: {
  fontSize: 12,
  color: "#111",
},

criseSection: {
  marginHorizontal: 13,
},

criseSectionRow: {
  flexDirection: "row",
  alignItems: "center",
  marginTop: 20,
  marginBottom: 10,
},

criseIcon: {
  width: 50,
  height: 50,
  borderRadius: 25,
  backgroundColor: "#C9F3FA",
  justifyContent: "center",
  alignItems: "center",
  marginRight: 18,
},

criseSectionTitle: {
  fontSize: 22,
  color: "#111",
},

criseLabel: {
  fontSize: 18,
  color: "#111",
  marginBottom: 5,
},

crisePickerBox: {
  height: 46,
  borderWidth: 1,
  borderColor: "#aaa",
  borderRadius: 6,
  paddingHorizontal: 10,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 10,
},

criseDateRow: {
  flexDirection: "row",
  gap: 10,
  marginBottom: 10,
},

criseSmallInput: {
  height: 46,
  borderWidth: 1,
  borderColor: "#aaa",
  borderRadius: 6,
  paddingHorizontal: 10,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
},

criseLocalInput: {
  height: 46,
  borderWidth: 1,
  borderColor: "#aaa",
  borderRadius: 6,
  paddingHorizontal: 12,
  fontSize: 16,
  marginBottom: 10,
},

criseInputNormal: {
  height: 46,
  borderWidth: 1,
  borderColor: "#aaa",
  borderRadius: 6,
  paddingHorizontal: 12,
  fontSize: 16,
  marginBottom: 10,
},

severidadeRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 4,
},

severidadeButton: {
  width: 65,
  height: 26,
  borderWidth: 1,
  borderColor: "#999",
  borderRadius: 3,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#fff",
},

severidadeText: {
  fontSize: 11,
  fontWeight: "bold",
  color: "#777",
  fontFamily: "serif",
},

criseInputNormal: {
  height: 26,
  borderWidth: 1,
  borderColor: "#999",
  borderRadius: 3,
  paddingHorizontal: 8,
  fontSize: 11,
  marginBottom: 4,
},

tagsArea: {
  flexDirection: "row",
  flexWrap: "wrap",
  gap: 6,
  marginLeft: 16,
  marginBottom: 5,
},

tag: {
  backgroundColor: "#CFF5FC",
  borderRadius: 18,
  paddingHorizontal: 9,
  paddingVertical: 4,
},

tagText: {
  fontSize: 11,
  color: "#777",
  fontWeight: "bold",
  fontFamily: "serif",
},

gatilhoRow: {
  flexDirection: "row",
  alignItems: "center",
  gap: 7,
  marginBottom: 10,
},

gatilhoInput: {
  flex: 1,
  height: 28,
  borderWidth: 1,
  borderColor: "#999",
  borderRadius: 3,
  paddingHorizontal: 8,
  fontSize: 11,
},

addButton: {
  width: 28,
  height: 28,
  borderWidth: 1,
  borderColor: "#999",
  borderRadius: 3,
  justifyContent: "center",
  alignItems: "center",
},

entreOutros: {
  color: "#1D5ED8",
  textAlign: "center",
  fontSize: 12,
  marginBottom: 8,
},

setaBaixo: {
  alignItems: "flex-end",
  marginRight: 10,
  marginBottom: 8,
},

acaoRow: {
  flexDirection: "row",
  alignItems: "center",
  marginLeft: 15,
  marginBottom: 7,
},

switchOff: {
  width: 54,
  height: 27,
  borderRadius: 20,
  backgroundColor: "#BDBDBD",
  justifyContent: "center",
  paddingHorizontal: 2,
  marginRight: 14,
},

switchBall: {
  width: 23,
  height: 23,
  borderRadius: 12,
  backgroundColor: "#fff",
},

acaoText: {
  fontSize: 11,
  color: "#111",
},

criseObs: {
  height: 70,
  borderWidth: 1,
  borderColor: "#999",
  borderRadius: 4,
  padding: 8,
  fontSize: 11,
  textAlignVertical: "top",
  marginBottom: 10,
},

criseSalvar: {
  alignSelf: "center",
  width: 205,
  height: 42,
  borderRadius: 25,
  backgroundColor: "#CFF5FC",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: 18,
  marginTop: 0,
  marginBottom: 12,
},

criseSalvarText: {
  fontSize: 18,
  color: "#111",
},

criseFooter: {
  alignSelf: "center",
  width: 300,
  height: 62,
  borderTopLeftRadius: 160,
  borderTopRightRadius: 160,
  backgroundColor: "#355A82",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: 12,
},
});