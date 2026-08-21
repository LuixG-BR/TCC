import React from "react";
import { TextInput } from "react-native";

import styles from "../styles/styles";

export default function Input({ placeholder }) {
  return <TextInput style={styles.input} placeholder={placeholder} />;
}
