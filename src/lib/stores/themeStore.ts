// src/lib/stores/themeStore.ts
/**
 * This module manages the global state for the application's color theme.
 */
import { writable } from 'svelte/store';

/**
 * Defines the possible string literal values for the application theme.
 */
export type Theme = 'light' | 'dark';

/**
 * A writable Svelte store that holds the current theme state ('light' or 'dark').
 *
 * Components can subscribe to this store to reactively update their styles,
 * and can also write to it to change the theme for the entire application.
 *
 * @default 'dark'
 */
export const theme = writable<Theme>('dark'); // The app defaults to dark mode.
