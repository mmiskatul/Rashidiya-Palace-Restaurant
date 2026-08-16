/**
 * Enquiry validation shared by the form and the route handler.
 *
 * The same rules run in both places on purpose: the client copy exists to help
 * someone fix a mistake quickly, while the server check is the one that
 * actually protects the endpoint, since anything sent from a browser can be
 * forged. Hand-rolled rather than pulling in a schema library for five fields.
 */

export type EnquiryInput = {
  name: string;
  phone: string;
  guests: string;
  when: string;
  message: string;
};

export type EnquiryErrors = Partial<Record<keyof EnquiryInput, string>>;

export const emptyEnquiry: EnquiryInput = {
  name: "",
  phone: "",
  guests: "",
  when: "",
  message: "",
};

/** Digits, spaces and the usual separators; 7–15 digits per E.164. */
const PHONE_PATTERN = /^\+?[\d\s().-]{7,20}$/;

export function validateEnquiry(input: EnquiryInput): EnquiryErrors {
  const errors: EnquiryErrors = {};

  const name = input.name.trim();
  if (name.length === 0) {
    errors.name = "Please tell us your name.";
  } else if (name.length < 2) {
    errors.name = "Please enter your full name.";
  } else if (name.length > 80) {
    errors.name = "Please keep your name under 80 characters.";
  }

  const phone = input.phone.trim();
  const digitCount = phone.replace(/\D/g, "").length;
  if (phone.length === 0) {
    errors.phone = "We need a number to confirm your booking.";
  } else if (!PHONE_PATTERN.test(phone) || digitCount < 7 || digitCount > 15) {
    errors.phone = "Enter a phone number we can reach you on.";
  }

  if (input.guests.trim().length > 0) {
    const guests = Number(input.guests);
    if (!Number.isInteger(guests) || guests < 1 || guests > 200) {
      errors.guests = "Enter a number of guests between 1 and 200.";
    }
  }

  if (input.when.trim().length > 120) {
    errors.when = "Please keep this under 120 characters.";
  }

  if (input.message.trim().length > 1000) {
    errors.message = "Please keep your message under 1000 characters.";
  }

  return errors;
}

export function hasErrors(errors: EnquiryErrors): boolean {
  return Object.keys(errors).length > 0;
}

/** Narrows unknown JSON from the request body into the expected shape. */
export function coerceEnquiry(body: unknown): EnquiryInput {
  const source = (body ?? {}) as Record<string, unknown>;
  const read = (key: keyof EnquiryInput) =>
    typeof source[key] === "string" ? (source[key] as string) : "";

  return {
    name: read("name"),
    phone: read("phone"),
    guests: read("guests"),
    when: read("when"),
    message: read("message"),
  };
}
