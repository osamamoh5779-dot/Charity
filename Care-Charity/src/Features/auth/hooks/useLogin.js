import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { getCooldownSeconds } from "../utils/loginErrors";
import { useAuth } from "./useAuth";

export function useLogin() {
  const { signIn } = useAuth();
  const [cooldown, setCooldown] = useState(0);

  const mutation = useMutation({
    mutationFn: signIn,
    onError: (error) => {
      if (error?.response?.status === 429) setCooldown(getCooldownSeconds(error));
    },
  });

  useEffect(() => {
    if (cooldown <= 0) return undefined;
    const timer = setTimeout(() => setCooldown((seconds) => seconds - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  return {
    login: mutation.mutate,
    reset: mutation.reset,
    error: mutation.error,
    isPending: mutation.isPending,
    cooldown,
  };
}
