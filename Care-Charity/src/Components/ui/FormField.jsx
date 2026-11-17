
export default function FormField({
  label,
  hint,
  error,
  required,
  htmlFor,
  className,
  children,
}) {
  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="block text-xs font-medium text-ink-secondary mb-1.5"
        >
          {label}
          {required && <span className="text-primary ms-1">*</span>}
        </label>
      )}

      {children}

      {error ? (
        <p id={`${htmlFor}-error`} className="text-[11px] text-danger mt-1.5">
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${htmlFor}-hint`} className="text-[11px] text-ink-muted mt-1.5">
            {hint}
          </p>
        )
      )}
    </div>
  );
}