 
import { cn } from "../../utils/cn";


import FormField from "./FormField";
import { fieldClass } from "./FieldClass";

import { useId } from "react";
export default function TextArea({
  ref,
  label,
  hint,
  error,
  required,
  rows = 3,
  id,
  className,
  wrapperClassName,
  ...props
}) {
  const autoId = useId();
  const textareaId = id ?? autoId;

  return (
    <FormField
      label={label}
      hint={hint}
      error={error}
      required={required}
      htmlFor={textareaId}
      className={wrapperClassName}
    >
      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        required={required}
        aria-invalid={!!error}
        aria-describedby={
          error
            ? `${textareaId}-error`
            : hint
              ? `${textareaId}-hint`
              : undefined
        }
        className={cn(fieldClass(error), "p-3 resize-none", className)}
        {...props}
      />
    </FormField>
  );
}