import { useEffect } from "react";
import { StyleSheet } from "react-native";
import * as WebBrowser from 'expo-web-browser';
import { useGlobalSearchParams } from 'expo-router';
import axios from 'axios';

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { STRAPI_URL } from "@/constants/Variables";

export default function VendorScreen() {
    const globSearchParams: any = useGlobalSearchParams();

    useEffect(() => {
        axios(`${STRAPI_URL}/api/auth/unified/callback`, {
            params: globSearchParams,
        }).then(response => console.log(response.data))
        WebBrowser.dismissBrowser();
    }, [])
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="link">Vendor Screen</ThemedText>
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
