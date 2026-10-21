"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/Button";

type SubmitButtonProps = {
  label: string;
  pendingLabel: string;
  pendingAnnouncement: string;
};

export function SubmitButton({ label, pendingLabel, pendingAnnouncement }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <>
      <Button
        variant="solid"
        type="submit"
        aria-disabled={pending || undefined}
        onClick={(event) => {
          if (pending) event.preventDefault();
        }}
        className="aria-disabled:cursor-progress aria-disabled:brightness-90 aria-disabled:active:scale-100"
      >
        {pending ? (
          <>
            {pendingLabel}
            <span aria-hidden="true" className="loading-dots">
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </span>
          </>
        ) : (
          label
        )}
      </Button>
      <p role="status" className="sr-only">
        {pending ? pendingAnnouncement : ""}
      </p>
    </>
  );
}
