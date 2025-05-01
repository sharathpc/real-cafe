import { useEffect } from "react";
import { Platform, StyleSheet } from "react-native";
import * as WebBrowser from 'expo-web-browser';
import { useGlobalSearchParams } from 'expo-router';
import axios from 'axios';

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ExternalLink } from "@/components/ExternalLink";
import { STRAPI_URL } from "@/constants/Variables";

export default function LoginScreen() {
  const CALLBACK_URL = Platform.OS === 'ios' ? 'projectc://' : 'com.anonymous.projectc://';

  const globSearchParams: any = useGlobalSearchParams();

  useEffect(() => {
    if(globSearchParams){
      axios(`${STRAPI_URL}/api/auth/unified/callback`, {
        params: globSearchParams,
      }).then(response => console.log(response.data))
      WebBrowser.dismissBrowser();
    }
  }, [globSearchParams])

  return (
    <ThemedView style={styles.container}>
      <ExternalLink href={`${STRAPI_URL}/api/connect/unified?callback=${CALLBACK_URL}`}>
        <ThemedText type="link">Login</ThemedText>
      </ExternalLink>
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
