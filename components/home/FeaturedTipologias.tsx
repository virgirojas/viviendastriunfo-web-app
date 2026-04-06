import connectMongo from "@/lib/mongodb";
import Tipologia from "@/models/Tipologia";
import Link from "next/link";
import TipologiaCard from "./TipologiaCard";

export default async function FeaturedTipologias() {
  await connectMongo();
  const featured = await Tipologia.find({ isFeatured: true }).sort({ createdAt: -1 }).limit(3);

  return (
    <section
      id="destacados"
      className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20"
    >
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-secondary">
            Destacados
          </span>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Modelos que hoy generan más interés
          </h2>

          <p className="mt-3 max-w-2xl text-slate-600">
            Descubrí las tipologías más elegidas por nuestros clientes.
          </p>
        </div>

        <Link href="/tipologias" className="inline-flex rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-brand-secondary/30 hover:text-brand-primary">
          Ver todas las tipologías
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {featured.map((tipologia) => (
          <TipologiaCard
            key={tipologia._id.toString()}
            tipologia={{
              id: tipologia._id.toString(),
              name: tipologia.name,
              squareMeters: tipologia.squareMeters,
              bedrooms: tipologia.bedrooms,
              price: tipologia.price,
              image: tipologia.image,
              description: tipologia.description,
              category: tipologia.category
            }}
          />
        ))}
      </div>
    </section>
  );
}
