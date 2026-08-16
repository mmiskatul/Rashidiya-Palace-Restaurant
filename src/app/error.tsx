"use client";

import { useEffect } from "react";
import { Phone, RotateCw } from "lucide-react";
import { CTAButton } from "@/components/ui/CTAButton";
import { Container } from "@/components/ui/Section";
import { telHref } from "@/data/restaurant";

/**
 * Route-level error boundary. Keeps the visitor inside the brand and, more
 * usefully, keeps the phone number in front of them.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Replace with your error reporting service when one is configured.
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-[70svh] flex-col items-center justify-center py-32 text-center">
      <span
        aria-hidden="true"
        className="arch block h-12 w-8 border border-gold/50 border-b-0"
      />
      <h1 className="mt-8 text-display-md text-ivory">
        Something went wrong on our side
      </h1>
      <p className="mt-5 max-w-md text-sm leading-relaxed text-sand-deep">
        Try loading the page again. If it keeps happening, call the restaurant
        and we will help you directly.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <CTAButton
          size="lg"
          onClick={reset}
          icon={<RotateCw className="h-4 w-4" />}
        >
          Try Again
        </CTAButton>
        <CTAButton
          href={telHref}
          variant="outline"
          size="lg"
          icon={<Phone className="h-4 w-4" />}
        >
          Call Us
        </CTAButton>
      </div>
    </Container>
  );
}
