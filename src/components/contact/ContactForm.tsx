"use client";

import { useId, useRef, useState } from "react";
import { AlertCircle, Check, Loader2, Phone } from "lucide-react";
import { CTAButton } from "@/components/ui/CTAButton";
import { restaurant, telHref } from "@/data/restaurant";
import {
  emptyEnquiry,
  hasErrors,
  validateEnquiry,
  type EnquiryErrors,
  type EnquiryInput,
} from "@/lib/enquiry";
import { cn, formatPhone } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "min-h-12 w-full border bg-ink px-4 py-3 text-sm text-ivory placeholder:text-sand-deep/70 " +
  "transition-colors duration-200 focus:border-gold focus:outline-none";

/**
 * Table enquiry form.
 *
 * Covers the four states a form owes the person filling it in: inline
 * validation on blur and submit, a busy state, a success state, and an error
 * state that gives them a way through — the phone number — rather than a dead
 * end. Errors are announced to screen readers and focus moves to the first
 * invalid field.
 */
export function ContactForm() {
  const formId = useId();
  const formRef = useRef<HTMLFormElement>(null);

  const [values, setValues] = useState<EnquiryInput>(emptyEnquiry);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");

  const update = (key: keyof EnquiryInput) => (value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    // Clear an error as soon as the person starts fixing it.
    if (errors[key]) {
      setErrors((current) => ({ ...current, [key]: undefined }));
    }
  };

  const validateField = (key: keyof EnquiryInput) => () => {
    const fieldErrors = validateEnquiry(values);
    setErrors((current) => ({ ...current, [key]: fieldErrors[key] }));
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateEnquiry(values);
    setErrors(nextErrors);

    if (hasErrors(nextErrors)) {
      const firstKey = Object.keys(nextErrors)[0];
      formRef.current
        ?.querySelector<HTMLElement>(`[name="${firstKey}"]`)
        ?.focus();
      return;
    }

    setStatus("submitting");
    setServerMessage("");

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data: { ok?: boolean; message?: string; errors?: EnquiryErrors } =
        await response.json().catch(() => ({}));

      if (response.ok && data.ok) {
        setStatus("success");
        setValues(emptyEnquiry);
        return;
      }

      if (data.errors) setErrors(data.errors);
      setStatus("error");
      setServerMessage(
        data.message ??
          "We could not send your message just now. Please call the restaurant.",
      );
    } catch {
      setStatus("error");
      setServerMessage(
        "We could not reach the server. Please check your connection, or call the restaurant.",
      );
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-start border border-gold/40 bg-ink-raised p-8 sm:p-10"
      >
        <span className="flex h-11 w-11 items-center justify-center border border-gold/50 text-gold-bright">
          <Check aria-hidden="true" className="h-5 w-5" />
        </span>
        <h2 className="mt-6 font-display text-2xl text-ivory">
          Thank you — we have your request
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-sand">
          Someone from the restaurant will call you back to confirm. If you need
          a table sooner, phone us directly and we will sort it out now.
        </p>
        <CTAButton
          href={telHref}
          variant="outline"
          className="mt-7"
          icon={<Phone className="h-4 w-4" />}
        >
          {formatPhone(restaurant.phone)}
        </CTAButton>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="border border-ivory/12 bg-ink-raised p-8 sm:p-10"
    >
      <h2 className="font-display text-2xl text-ivory">Request a table</h2>
      <p className="mt-3 text-sm leading-relaxed text-sand-deep">
        Send the details and we will call you back to confirm. For same-day
        tables, phoning is faster.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <Field
          id={`${formId}-name`}
          name="name"
          label="Your name"
          required
          value={values.name}
          error={errors.name}
          onChange={update("name")}
          onBlur={validateField("name")}
          autoComplete="name"
          placeholder="Full name"
        />

        <Field
          id={`${formId}-phone`}
          name="phone"
          label="Phone number"
          required
          type="tel"
          inputMode="tel"
          value={values.phone}
          error={errors.phone}
          onChange={update("phone")}
          onBlur={validateField("phone")}
          autoComplete="tel"
          placeholder="+971 5X XXX XXXX"
        />

        <Field
          id={`${formId}-guests`}
          name="guests"
          label="Number of guests"
          type="number"
          inputMode="numeric"
          value={values.guests}
          error={errors.guests}
          onChange={update("guests")}
          onBlur={validateField("guests")}
          placeholder="e.g. 6"
        />

        <Field
          id={`${formId}-when`}
          name="when"
          label="Preferred day and time"
          value={values.when}
          error={errors.when}
          onChange={update("when")}
          onBlur={validateField("when")}
          placeholder="e.g. Friday evening"
        />

        <div className="sm:col-span-2">
          <Field
            id={`${formId}-message`}
            name="message"
            label="Anything we should know?"
            multiline
            value={values.message}
            error={errors.message}
            onChange={update("message")}
            onBlur={validateField("message")}
            placeholder="High chairs, a birthday, dietary requirements…"
            hint="Optional"
          />
        </div>
      </div>

      {status === "error" ? (
        <div
          role="alert"
          className="mt-7 flex items-start gap-3 border border-gold/40 bg-ink p-4"
        >
          <AlertCircle
            aria-hidden="true"
            className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold-bright"
          />
          <div className="text-sm text-sand">
            <p>{serverMessage}</p>
            <a
              href={telHref}
              className="mt-2 inline-block font-medium text-gold-bright underline underline-offset-4 transition-colors duration-200 hover:text-ivory"
            >
              Call {formatPhone(restaurant.phone)}
            </a>
          </div>
        </div>
      ) : null}

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <CTAButton
          type="submit"
          size="lg"
          disabled={submitting}
          icon={
            submitting ? (
              <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
            ) : undefined
          }
        >
          {submitting ? "Sending…" : "Send Request"}
        </CTAButton>

        <p className="text-xs leading-relaxed text-sand-deep">
          Or call{" "}
          <a
            href={telHref}
            className="text-gold-bright underline underline-offset-4 transition-colors duration-200 hover:text-ivory"
          >
            {formatPhone(restaurant.phone)}
          </a>
        </p>
      </div>
    </form>
  );
}

/* -------------------------------------------------------------------------- */

type FieldProps = {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error?: string;
  required?: boolean;
  multiline?: boolean;
  hint?: string;
  type?: string;
  inputMode?: "tel" | "numeric" | "text";
  autoComplete?: string;
  placeholder?: string;
};

/**
 * One labelled field. The label is always visible — a placeholder disappears
 * the moment someone types, which is exactly when they need it most.
 */
function Field({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  error,
  required,
  multiline,
  hint,
  type = "text",
  inputMode,
  autoComplete,
  placeholder,
}: FieldProps) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy =
    [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") ||
    undefined;

  const shared = {
    id,
    name,
    value,
    placeholder,
    "aria-invalid": error ? (true as const) : undefined,
    "aria-describedby": describedBy,
    required,
    onBlur,
    className: cn(fieldClass, error ? "border-gold" : "border-ivory/20"),
  };

  return (
    <div className="flex flex-col">
      <label
        htmlFor={id}
        className="label-xs mb-2.5 flex items-center gap-2 text-sand"
      >
        {label}
        {required ? (
          <span className="text-gold" aria-hidden="true">
            *
          </span>
        ) : null}
        {required ? <span className="sr-only">(required)</span> : null}
      </label>

      {multiline ? (
        <textarea
          {...shared}
          rows={4}
          onChange={(event) => onChange(event.target.value)}
          className={cn(shared.className, "resize-y")}
        />
      ) : (
        <input
          {...shared}
          type={type}
          inputMode={inputMode}
          autoComplete={autoComplete}
          onChange={(event) => onChange(event.target.value)}
        />
      )}

      {hint && !error ? (
        <p id={hintId} className="mt-2 text-xs text-sand-deep">
          {hint}
        </p>
      ) : null}

      {error ? (
        <p
          id={errorId}
          className="mt-2 flex items-center gap-1.5 text-xs text-gold-bright"
        >
          <AlertCircle aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      ) : null}
    </div>
  );
}
