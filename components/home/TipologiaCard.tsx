import Image from "next/image";
import Link from "next/link";

export type TipologiaInfo = {
  id: string;
  name: string;
  squareMeters: string;
  bedrooms: string;
  price: string;
  image: string;
  description: string;
  category: string;
}

type PackageCardProps = {
  tipologia: TipologiaInfo;
};

export default function TipologiaCard({ tipologia }: PackageCardProps) {
  return (
    <article className="group overflow-hidden rounded-none bg-white shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col h-full border border-slate-100">
      <div className="relative h-72 overflow-hidden bg-slate-100">
        <Image
          src={tipologia.image}
          alt={tipologia.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />

        <span className="absolute left-6 top-6 bg-brand-primary px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white shadow-md">
          {tipologia.category}
        </span>

        <div className="absolute bottom-6 left-6 right-6 text-white">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-primary mb-1 drop-shadow-sm">{tipologia.squareMeters}</p>
          <h3 className="text-3xl font-black uppercase tracking-tight leading-none drop-shadow-md">
            {tipologia.name}
          </h3>
        </div>
      </div>

      <div className="flex flex-col flex-grow p-6 sm:p-8">
        <p className="text-sm leading-relaxed text-slate-600 mb-8 flex-grow">
          {tipologia.description}
        </p>

        <div className="grid grid-cols-2 gap-4 text-sm mb-8">
          <div className="flex flex-col border-l-2 border-brand-primary pl-4">
            <p className="text-xs font-bold uppercase tracking-wider text-brand-secondary">Dormitorios</p>
            <p className="mt-1 text-lg font-bold text-slate-900">
              {tipologia.bedrooms}
            </p>
          </div>

          <div className="flex flex-col border-l-2 border-brand-primary pl-4">
            <p className="text-xs font-bold uppercase tracking-wider text-brand-secondary">Precio desde</p>
            <p className="mt-1 text-lg font-black text-brand-primary">
              {tipologia.price}
            </p>
          </div>
        </div>

        <Link href={`/tipologias/${tipologia.id}`} className="mt-auto flex w-full items-center justify-center bg-black px-6 py-4 text-sm font-bold uppercase tracking-widest text-white transition-colors duration-300 hover:bg-brand-primary hover:text-white">
          Ver Modelo
        </Link>
      </div>
    </article>
  );
}
