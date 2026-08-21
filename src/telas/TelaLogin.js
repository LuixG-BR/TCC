import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { HeartPulse, Menu } from "lucide-react-native";
import styles from "../styles/styles";

export default function TelaLogin({ setTela }) {
  return (
    <View style={styles.container}>
      <View style={styles.topCircle} />

      <TouchableOpacity style={styles.menu} onPress={() => setTela("inicio")}>
        <Menu size={25} color="#572EA9" />
      </TouchableOpacity>

      <View style={styles.mobileBrandIcon}>
        <HeartPulse size={28} color="#FFFFFF" />
      </View>
      <Text style={styles.logoInicio}>EMPS</Text>
      <Text style={{ color: "#7C7193", textAlign: "center", marginBottom: 30 }}>
        Sistema de Monitoramento e Prevenção de Crises Epilépticas
      </Text>

      <TouchableOpacity style={styles.loginButton} onPress={() => setTela("inicio")}>
        <Text style={styles.loginText}>Entrar no sistema</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.bottomCircle} onPress={() => setTela("conexao")}>
        <Text style={styles.connectionText}>FAZER CONEXÃO</Text>
      </TouchableOpacity>
    </View>
  );
}
