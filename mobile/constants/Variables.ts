import { Platform } from "react-native";

/**
 * Below are the variables that are used in the app.
 */
export const STRAPI_URL = 'http://localhost:1337';
export const CALLBACK_URL = Platform.OS === 'ios' ? 'projectc://' : 'com.anonymous.projectc://';
