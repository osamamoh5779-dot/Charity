import { useRef, useState } from "react";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import IconButton from "@/components/ui/IconButton";
import InfoBanner from "@/components/ui/InfoBanner";
import Input from "@/components/ui/Input";
import { LIMITS } from "../constants/auth";
import { useLogin } from "../hooks/useLogin";
import { describeLoginError } from "../utils/loginErrors";
import { validateLogin } from "../utils/validators";

export default function LoginForm({ t }) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [notice, setNotice] = useState("");

  const identifierRef = useRef(null);
  const passwordRef = useRef(null);

  const { login, reset, error, isPending, cooldown } = useLogin();
  const apiError = error ? describeLoginError(error, t.errors) : null;
  const locked = isPending || cooldown > 0;

  const edit = (field, setValue) => (event) => {
    setValue(event.target.value);
    setNotice("");
    setFieldErrors((previous) => ({ ...previous, [field]: undefined }));
    if (error) reset();
  };

  const submit = (event) => {
    event.preventDefault();
    if (locked) return;

    setNotice("");
    const errors = validateLogin({ identifier, password }, t.errors);
    setFieldErrors(errors);

    if (errors.identifier) return identifierRef.current?.focus();
    if (errors.password) return passwordRef.current?.focus();

    login({ identifier: identifier.trim(), password, remember });
  };

  const label = isPending ? t.signingIn : cooldown > 0 ? t.tryAgainIn(cooldown) : t.signIn;

  return (
    <form onSubmit={submit} noValidate className="mt-5 space-y-3">
      <Input
        ref={identifierRef}
        label={t.identifier}
        leftIcon={Mail}
        name="username"
        autoComplete="username"
        autoCapitalize="none"
        spellCheck={false}
        maxLength={LIMITS.identifierMax}
        placeholder={t.identifierPlaceholder}
        value={identifier}
        onChange={edit("identifier", setIdentifier)}
        error={fieldErrors.identifier ?? apiError?.fields.identifier}
        disabled={isPending}
      />

      <Input
        ref={passwordRef}
        label={t.password}
        leftIcon={Lock}
        type={showPassword ? "text" : "password"}
        name="password"
        autoComplete="current-password"
        maxLength={LIMITS.passwordMax}
        value={password}
        onChange={edit("password", setPassword)}
        error={fieldErrors.password ?? apiError?.fields.password}
        disabled={isPending}
        trailing={
          <IconButton
            icon={showPassword ? EyeOff : Eye}
            label={showPassword ? t.hidePassword : t.showPassword}
            aria-pressed={showPassword}
            onClick={() => setShowPassword((on) => !on)}
          />
        }
      />

      <div className="flex flex-wrap items-center justify-between gap-2">
        <Checkbox label={t.remember} checked={remember} onChange={(e) => setRemember(e.target.checked)} />
        <Button variant="ghost" size="sm" onClick={() => setNotice(t.forgotNotice)}>
          {t.forgot}
        </Button>
      </div>

      {apiError?.message && <InfoBanner variant="error">{apiError.message}</InfoBanner>}
      {notice && <InfoBanner variant="info">{notice}</InfoBanner>}

      <Button
        type="submit"
        size="lg"
        className="w-full"
        loading={isPending}
        disabled={locked}
        rightIcon={<ArrowRight size={17} aria-hidden="true" />}
      >
        {label}
      </Button>
    </form>
  );
}
