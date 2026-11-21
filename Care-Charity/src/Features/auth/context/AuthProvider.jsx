import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { isAuthFailure, refreshSession } from "@/services/http";
import {
  clearTokens,
  getAccessToken,
  hasRefreshToken,
} from "@/services/tokenStore";
import { onSessionExpired } from "@/services/sessionEvents";
import { applyLanguage, getLanguage, hasSavedLanguage } from "@/utils/language";
import {
  changeLanguage,
  fetchFlags,
  fetchProfile,
  signIn as signInRequest,
  signOut as signOutRequest,
} from "../api";
import { DASHBOARD_USER_TYPES } from "../constants/auth";
import { AuthContext } from "./authContext";

const LOADING = { status: "loading", user: null, flags: {}, error: "" };
const GUEST = { status: "guest", user: null, flags: {}, error: "" };
const CHANNEL_NAME = "we-care-auth";

async function loadSession() {
  try {
    if (!getAccessToken()) await refreshSession();
    const [user, flags] = await Promise.all([fetchProfile(), fetchFlags()]);

    if (!user || !DASHBOARD_USER_TYPES.includes(user.type))
      return { type: "expired" };
    return { type: "ok", user, flags };
  } catch (error) {
    return isAuthFailure(error)
      ? { type: "expired" }
      : { type: "error", message: error.message };
  }
}

export default function AuthProvider({ children }) {
  const queryClient = useQueryClient();
  const [state, setState] = useState(() =>
    hasRefreshToken() ? LOADING : GUEST,
  );
  const channelRef = useRef(null);

  const startSession = useCallback(
    (user, flags) => {
      if (hasSavedLanguage()) {
        // The language (and direction) chosen in this browser is the same on every page and
        // after every reload. The API answers in the profile locale, so keep it in step.
        const local = getLanguage();
        if (user?.locale && user.locale !== local) {
          changeLanguage(local)
            .then(() => queryClient.invalidateQueries())
            .catch(() => void 0);
        }
      } else if (user?.locale) {
        applyLanguage(user.locale);
      }
      setState({ status: "authenticated", user, flags, error: "" });
    },
    [queryClient],
  );

  const endSession = useCallback(
    (broadcast = true) => {
      clearTokens();
      queryClient.clear();
      setState(GUEST);
      if (broadcast) channelRef.current?.postMessage("logout");
    },
    [queryClient],
  );

  const applyOutcome = useCallback(
    (outcome) => {
      if (outcome.type === "ok") startSession(outcome.user, outcome.flags);
      else if (outcome.type === "expired") endSession();
      else
        setState({
          status: "error",
          user: null,
          flags: {},
          error: outcome.message,
        });
    },
    [endSession, startSession],
  );

  useEffect(() => {
    if (!hasRefreshToken()) return undefined;

    let cancelled = false;
    loadSession().then((outcome) => {
      if (!cancelled) applyOutcome(outcome);
    });
    return () => {
      cancelled = true;
    };
  }, [applyOutcome]);

  useEffect(() => onSessionExpired(() => endSession()), [endSession]);

  useEffect(() => {
    if (typeof BroadcastChannel === "undefined") return undefined;
    const channel = new BroadcastChannel(CHANNEL_NAME);
    channelRef.current = channel;
    channel.onmessage = (event) => {
      if (event.data === "logout") endSession(false);
    };
    return () => {
      channel.close();
      channelRef.current = null;
    };
  }, [endSession]);

  const signIn = useCallback(
    async (credentials) => {
      const { user: signedIn, flags } = await signInRequest(credentials);
      let user = signedIn;
      // Keep the language the login page was showing: the API uses the profile locale after sign-in.
      const chosen = getLanguage();
      applyLanguage(chosen); // remember it, so every page after sign-in uses the same one
      if (user.locale && user.locale !== chosen) {
        try {
          await changeLanguage(chosen);
          user = { ...user, locale: chosen };
        } catch {
          void 0;
        }
      }
      queryClient.clear();
      startSession(user, flags);
    },
    [queryClient, startSession],
  );

  const signOut = useCallback(async () => {
    try {
      await signOutRequest();
    } catch {
      void 0;
    }
    endSession();
  }, [endSession]);

  const reload = useCallback(async () => {
    setState(LOADING);
    applyOutcome(await loadSession());
  }, [applyOutcome]);

  const value = useMemo(
    () => ({
      ...state,
      isAuthenticated: state.status === "authenticated",
      signIn,
      signOut,
      reload,
    }),
    [state, signIn, signOut, reload],
  );

  return <AuthContext value={value}>{children}</AuthContext>;
}
