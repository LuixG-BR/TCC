import React from "react";
import { View, Text } from "react-native";

import styles from "../styles/styles";

export default function SectionTitle({ icon, title, blue, red }) {
  return (
    <View style={styles.section}>
      <View
        style={[
          styles.iconCircle,
          blue && { backgroundColor: "#DCEBFF", borderColor: "rgba(37,99,235,0.18)" },
          red && { backgroundColor: "#E6E2FF", borderColor: "rgba(109,93,251,0.18)" },
        ]}
      >
        {icon}
      </View>

      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
}
