import connectMongo from "@/lib/mongodb";
import Tipologia from "@/models/Tipologia";
import TipologiaCard from "./TipologiaCard";

export default async function AllTipologias({ searchParamsParsed }: { searchParamsParsed?: { q: string, category: string, bedrooms: string, budget: string } }) {
  await connectMongo();
  
  const mongooseFilters: Record<string, unknown>[] = [];
  
  if (searchParamsParsed?.q) {
    mongooseFilters.push({
      $or: [
        { name: { $regex: searchParamsParsed.q, $options: 'i' } },
        { category: { $regex: searchParamsParsed.q, $options: 'i' } }
      ]
    });
  }

  if (searchParamsParsed?.category) {
    mongooseFilters.push({
      $or: [
        { name: { $regex: searchParamsParsed.category, $options: 'i' } },
        { category: { $regex: searchParamsParsed.category, $options: 'i' } }
      ]
    });
  }

  const filter = mongooseFilters.length > 0 ? { $and: mongooseFilters } : {};

  let allTipologias = await Tipologia.find(filter).sort({ createdAt: -1 });

  if (searchParamsParsed) {
    allTipologias = allTipologias.filter((tipologia) => {
      
      if (searchParamsParsed.bedrooms === "1" && !/1/.test(tipologia.bedrooms)) return false;
      if (searchParamsParsed.bedrooms === "2" && !/2/.test(tipologia.bedrooms)) return false;
      if (searchParamsParsed.bedrooms === "3+") {
        const nums = tipologia.bedrooms.match(/\d+/g);
        if (!nums?.some((n: string) => parseInt(n, 10) >= 3)) return false;
      }

      if (searchParamsParsed.budget) {
        const cleanPriceStr = tipologia.price.replace(/[^\d.]/g, '').replace(/\./g, '');
        const numericalValue = parseFloat(cleanPriceStr);
        if (!isNaN(numericalValue)) {
           if (searchParamsParsed.budget === "low" && numericalValue > 1500) return false;
           if (searchParamsParsed.budget === "medium" && (numericalValue < 1500 || numericalValue > 3000)) return false;
           if (searchParamsParsed.budget === "high" && numericalValue <= 3000) return false;
        }
      }

      return true;
    });
  }

  return (
    <section
      id="tipologias"
      className="relative bg-slate-50 pb-20 pt-16 sm:pt-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center md:mb-16">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-secondary">
            Nuestro Catálogo
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Explora todos los modelos
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">
            {searchParamsParsed && (searchParamsParsed.q || searchParamsParsed.category || searchParamsParsed.budget || searchParamsParsed.bedrooms)
              ? `Resultados de búsqueda avanzados:` 
              : "Descubrí todas las opciones que tenemos diseñadas para que tengas la casa de tus sueños."}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {allTipologias.map((tipologia) => (
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

        {allTipologias.length === 0 && (
          <div className="text-center py-20 px-4">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 mb-4 text-slate-400">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-slate-900">No encontramos coincidencias</h3>
            <p className="mt-1 text-slate-500">Intenta buscar con otros modelos o estilos.</p>
          </div>
        )}
      </div>
    </section>
  );
}
