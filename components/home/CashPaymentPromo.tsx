import Link from "next/link";

type CashPaymentPromoProps = {
  variant?: "banner" | "hero";
};

export default function CashPaymentPromo({ variant = "hero" }: CashPaymentPromoProps) {
  if (variant === "banner") {
    return (
      <div className="bg-brand-primary text-center">
        <Link
          href="/contacto"
          className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-black transition hover:bg-white sm:text-sm"
        >
          <span className="rounded bg-black px-2 py-0.5 text-brand-primary">25% OFF</span>
          <span>Pago de contado en todos los modelos</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="justify-self-end w-full max-w-sm">
      <div className="relative overflow-hidden border-t-4 border-brand-primary bg-black/85 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md">
        <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-brand-primary/20 blur-2xl" />

        <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-brand-primary">
          Promoción especial
        </p>

        <div className="mb-4 flex items-end gap-2">
          <span className="text-7xl font-black leading-none text-brand-primary">25%</span>
          <span className="pb-2 text-2xl font-bold uppercase leading-tight text-white">
            OFF
          </span>
        </div>

        <p className="mb-6 text-lg font-bold uppercase tracking-wide text-white">
          Pago de contado
        </p>

        <p className="mb-6 text-sm font-medium leading-relaxed text-white/80">
          Aprovechá el descuento abonando tu vivienda en un solo pago. Consultanos por condiciones.
        </p>

        <Link
          href="/contacto"
          className="inline-flex w-full items-center justify-center rounded-none bg-brand-primary px-6 py-3.5 text-sm font-bold uppercase tracking-widest text-black transition hover:bg-white"
        >
          Quiero el descuento
        </Link>
      </div>
    </div>
  );
}
