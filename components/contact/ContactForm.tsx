"use client";

import { type FormEvent, useActionState, useEffect, useRef, useState } from "react";
import { sendContact } from "@/app/actions/contact";
import { PrivacyLink } from "@/components/privacy/PrivacyLink";
import { Field } from "@/components/ui/form/Field";
import { site } from "@/content/site";
import { type ContactField, contactLimits } from "@/lib/contact/fields";
import { type ContactState, honeypotField, initialContactState, startedAtField } from "@/lib/contact/state";
import { SubmitButton } from "./SubmitButton";

const counterThreshold = 0.9;

const numberFormat = new Intl.NumberFormat("fr-CA");

const formatCount = (value: number) => numberFormat.format(value).replace(/\s/g, " ");

type Edits = {
  state: ContactState;
  corrected: ReadonlySet<ContactField>;
  messageLength: number | null;
};

function isCorrected(control: HTMLInputElement | HTMLTextAreaElement) {
  return control.validity.valid && (!control.required || control.value.trim() !== "");
}

export function ContactForm() {
  const { fields, requiredNote, submit, pending, pendingAnnouncement, counterUnit, consent, messages } = site.contact;
  const [state, formAction] = useActionState(sendContact, initialContactState, "/#contact");
  const [edits, setEdits] = useState<Edits>({ state, corrected: new Set(), messageLength: null });
  const startedAtRef = useRef<HTMLInputElement>(null);
  const announcementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (startedAtRef.current) startedAtRef.current.value = String(Date.now());
  }, []);

  useEffect(() => {
    if (state.status !== "idle") announcementRef.current?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <div
        ref={announcementRef}
        role="status"
        tabIndex={-1}
        className="enter text-lead focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sapin"
      >
        <p>{messages.success}</p>
      </div>
    );
  }

  const values = state.status === "error" ? state.values : undefined;
  const fieldErrors = state.status === "error" ? state.fieldErrors : undefined;
  const current = edits.state === state ? edits : { state, corrected: new Set<ContactField>(), messageLength: null };
  const errorFor = (field: ContactField) => (current.corrected.has(field) ? undefined : fieldErrors?.[field]);
  const allCorrected =
    fieldErrors !== undefined && Object.keys(fieldErrors).every((field) => current.corrected.has(field as ContactField));
  const messageLength = current.messageLength ?? values?.message?.length ?? 0;
  const messageHint =
    messageLength >= contactLimits.message * counterThreshold
      ? `${formatCount(messageLength)} / ${formatCount(contactLimits.message)} ${counterUnit}`
      : undefined;

  const handleChange = (event: FormEvent<HTMLFormElement>) => {
    const control = event.target;
    if (!(control instanceof HTMLInputElement || control instanceof HTMLTextAreaElement)) return;
    const field = control.name as ContactField;
    const corrected = fieldErrors?.[field] !== undefined && isCorrected(control);
    const length = field === "message" ? control.value.length : null;
    setEdits((previous) => {
      const base = previous.state === state ? previous : current;
      return {
        state,
        corrected: corrected ? new Set(base.corrected).add(field) : base.corrected,
        messageLength: length ?? base.messageLength,
      };
    });
  };

  return (
    <form
      action={formAction}
      onChange={handleChange}
      className="relative grid gap-y-17 md:grid-cols-2 md:gap-x-54 lg:gap-y-26"
    >
      <p className="text-small md:col-span-2">{requiredNote}</p>
      {state.status === "error" && !allCorrected && (
        <div
          ref={announcementRef}
          role="alert"
          tabIndex={-1}
          className="enter text-small font-bold text-sapin focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sapin md:col-span-2"
        >
          <p>{state.message}</p>
        </div>
      )}
      <Field
        label={fields.firstName.label}
        name="firstName"
        required
        autoComplete="given-name"
        maxLength={contactLimits.firstName}
        defaultValue={values?.firstName}
        error={errorFor("firstName")}
      />
      <Field
        label={fields.lastName.label}
        name="lastName"
        required
        autoComplete="family-name"
        maxLength={contactLimits.lastName}
        defaultValue={values?.lastName}
        error={errorFor("lastName")}
      />
      <Field
        label={fields.email.label}
        name="email"
        type="email"
        required
        autoComplete="email"
        maxLength={contactLimits.email}
        defaultValue={values?.email}
        error={errorFor("email")}
      />
      <Field
        label={fields.message.label}
        name="message"
        multiline
        maxLength={contactLimits.message}
        defaultValue={values?.message}
        error={errorFor("message")}
        hint={messageHint}
        className="md:col-span-2"
      />
      <div aria-hidden className="absolute left-[-10000px] size-px overflow-hidden">
        <label htmlFor="champ-siteWeb">Ne pas remplir ce champ</label>
        <input id="champ-siteWeb" name={honeypotField} type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>
      <input ref={startedAtRef} type="hidden" name={startedAtField} defaultValue="" />
      <div className="mt-14 md:col-span-2 lg:mt-5">
        <SubmitButton label={submit} pendingLabel={pending} pendingAnnouncement={pendingAnnouncement} />
        <p className="mt-12 text-[0.875rem] leading-snug">
          {consent.before}
          <PrivacyLink
            className="underline-shift whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sapin"
          >
            {consent.link}
          </PrivacyLink>
          {consent.after}
        </p>
      </div>
    </form>
  );
}
