import { Phone } from "lucide-react";
import { CTAButton } from "@/components/ui/CTAButton";
import { Container } from "@/components/ui/Section";
import { telHref } from "@/data/restaurant";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70svh] flex-col items-center justify-center py-32 text-center">
      <span
        aria-hidden="true"
        className="arch block h-12 w-8 border border-gold/50 border-b-0"
      />
      <p className="label-xs mt-8 text-gold">404</p>
      <h1 className="mt-5 text-display-md text-ivory">
        This page is not on the menu
      </h1>
      <p className="mt-5 max-w-md text-sm leading-relaxed text-sand-deep">
        The link may be out of date. Head back to the homepage, browse what the
        kitchen is serving, or just give us a call.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <CTAButton href="/" size="lg">
          Back to Home
        </CTAButton>
        <CTAButton href="/menu" variant="outline" size="lg">
          View Menu
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
