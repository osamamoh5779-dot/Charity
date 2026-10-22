import { useId } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/utils/cn";
import FormField from "./FormField";
import { fieldClass } from "./FieldClass";

export default function Select({
  ref,
  label,
  hint,
  error,
  required,
  id,
  className,
  wrapperClassName,
  children,
  ...props
}) {
  const autoId = useId();
  const selectId = id ?? autoId;

  return (
    <FormField
      label={label}
      hint={hint}
      error={error}
      required={required}
      htmlFor={selectId}
      className={wrapperClassName}
    >
      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${selectId}-error` : hint ? `${selectId}-hint` : undefined}
          className={cn(fieldClass(error), "h-10 ps-3.5 pe-10 appearance-none cursor-pointer", className)}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="w-4 h-4 text-ink-secondary absolute end-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
        />
      </div>
    </FormField>
  );
}
