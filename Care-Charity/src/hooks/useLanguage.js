import { useSyncExternalStore } from "react";
import { getLanguage, subscribeLanguage } from "@/utils/language";

export default function useLanguage() {
  return useSyncExternalStore(subscribeLanguage, getLanguage, () => "en");
}
