// src/routes/+layout.ts

import { waitLocale } from "svelte-i18n";
import type { LayoutLoad } from "./$types";
import "$lib/i18n"

export const load: LayoutLoad = async () => {
    await waitLocale(); // Wait the correct language
};