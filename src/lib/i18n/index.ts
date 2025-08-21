// src/lib/i18n/index.ts
import { browser } from "$app/environment";
import { register, init, getLocaleFromNavigator } from "svelte-i18n";

// Register the languages that app support, dynamic import for only upload the idiom file that the users need 
register("en", () => import("../locales/en.json"));
register("es", () => import("../locales/es.json"));

// Start the library 
init({
    fallbackLocale: "en", // If the browser language is not "en" or "es" will use english
    initialLocale: browser ? getLocaleFromNavigator() : "en" // Detecct automatically the browser language from the useer 
}); 

