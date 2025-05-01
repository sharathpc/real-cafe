import { StyleSheet } from "react-native";
import { Link } from "expo-router";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ExternalLink } from "@/components/ExternalLink";
import { STRAPI_URL } from "@/constants/Variables";

export default function LoginScreen() {
  return (
    <ThemedView style={styles.container}>
      <ExternalLink href={`${STRAPI_URL}/api/connect/unified`}>
        <ThemedText type="link">Login</ThemedText>
      </ExternalLink>
      <Link href="/vendor">Vendor</Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
