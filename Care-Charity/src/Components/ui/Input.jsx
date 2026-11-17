 
import { cn } from "../../utils/cn";

import FormField from "./FormField";
import { fieldClass } from "./FieldClass";

import { useId } from "react";

export default function Input({
  ref,
  label,
  hint,
  error,
  required,
  leftIcon: LeftIcon,
  mono = false,
  id,
  className,
  wrapperClassName,
  ...props
}) {
  const autoId = useId();
  const inputId = id ?? autoId;

  return (
    <FormField
      label={label}
      hint={hint}
      error={error}
      required={required}
      htmlFor={inputId}
      className={wrapperClassName}
    >
      <div className="relative flex items-center">
        {LeftIcon && (
          <LeftIcon
            aria-hidden="true"
            className="w-4 h-4 text-ink-secondary absolute start-3.5 pointer-events-none"
          />
        )}
        <input
          ref={ref}
          id={inputId}
          required={required}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
          }
          className={cn(
            fieldClass(error),
            "h-10 px-3.5",
            LeftIcon && "ps-10",
            mono && "font-mono text-primary",
            className,
          )}
          {...props}
        />
      </div>
    </FormField>
  );
}