const KEY = "we-care.lang";
export const SUPPORTED_LANGUAGES = ["ar", "en"];

export function getLanguage() {
  try {
    const value = window.localStorage.getItem(KEY);
    return SUPPORTED_LANGUAGES.includes(value) ? value : "en";
  } catch {
    return "en";
  }
}

export function hasSavedLanguage() {
  try {
    return SUPPORTED_LANGUAGES.includes(window.localStorage.getItem(KEY));
  } catch {
    return false;
  }
}

const listeners = new Set();

export function subscribeLanguage(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function saveLanguage(language) {
  if (!SUPPORTED_LANGUAGES.includes(language)) return;
  try {
    window.localStorage.setItem(KEY, language);
  } catch {
    void 0;
  }
  setDocumentLanguage(language);
  listeners.forEach((listener) => listener());
}

const isRtl = (language) => language === "ar";

function setDocumentLanguage(language) {
  document.documentElement.lang = language;
  document.documentElement.dir = isRtl(language) ? "rtl" : "ltr";
}

export function initLanguage() {
  setDocumentLanguage(getLanguage());
 
  window.addEventListener("storage", (event) => {
    if (event.key !== KEY) return;
    setDocumentLanguage(getLanguage());
    listeners.forEach((listener) => listener());
  });
}

export function applyLanguage(language) {
  saveLanguage(language);
}
