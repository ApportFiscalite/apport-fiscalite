import type { HTMLInputAutoCompleteAttribute } from "react";
import { cn } from "@/lib/cn";

type FieldProps = {
  label: string;
  name: string;
  required?: boolean;
  type?: "text" | "email";
  autoComplete?: HTMLInputAutoCompleteAttribute;
  maxLength?: number;
  defaultValue?: string;
  error?: string;
  hint?: string;
  multiline?: boolean;
  className?: string;
};

const control =
  "block w-full rounded-[0.4em] rounded-br-none bg-chair px-[0.6em] py-[0.43em] text-label lg:py-[0.35em] text-foret outline-2 -outline-offset-2 outline-transparent transition-[outline-color,background-color] duration-200 focus-visible:bg-chair-light focus-visible:outline-sapin aria-invalid:outline-sapin";

export function Field({
  label,
  name,
  required = false,
  type = "text",
  autoComplete,
  maxLength,
  defaultValue,
  error,
  hint,
  multiline = false,
  className,
}: FieldProps) {
  const id = `champ-${name}`;
  const errorId = `${id}-erreur`;
  const hintId = `${id}-aide`;
  const describedBy = [error && errorId, hint && hintId].filter(Boolean).join(" ");
  const shared = {
    id,
    name,
    required,
    maxLength,
    defaultValue,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy || undefined,
  };

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-4 block text-label font-light lg:mb-1">
        {label}
        {required && <span aria-hidden>*</span>}
      </label>
      {multiline ? (
        <textarea {...shared} rows={6} className={cn(control, "min-h-[15.9em] resize-y lg:min-h-[9.4em]")} />
      ) : (
        <input {...shared} type={type} autoComplete={autoComplete} className={control} />
      )}
      {error && (
        <p id={errorId} className="enter mt-4 text-small font-bold text-sapin">
          {error}
        </p>
      )}
      {hint && (
        <p id={hintId} className="enter mt-4 text-right text-small">
          {hint}
        </p>
      )}
    </div>
  );
}
