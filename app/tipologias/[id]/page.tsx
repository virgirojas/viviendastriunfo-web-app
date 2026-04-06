import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import connectMongo from '@/lib/mongodb';
import Tipologia from '@/models/Tipologia';

export const dynamic = "force-dynamic";

export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const params = await props.params;
  await connectMongo();
  let tipologia;
  try {
    tipologia = await Tipologia.findById(params.id);
  } catch (error) {
    return { title: "Tipología no encontrada | Viviendas Triunfo" };
  }
  if (!tipologia) return { title: "Tipología no encontrada | Viviendas Triunfo" };
  
  return {
    title: `${tipologia.name} | Viviendas Triunfo`,
    description: tipologia.description,
  };
}

export default async function TipologiaDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  await connectMongo();

  let tipologia;
  try {
    tipologia = await Tipologia.findById(params.id);
  } catch (error) {
    notFound();
  }

  if (!tipologia) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <div className="absolute top-0 w-full z-50">
        <Header />
      </div>

      <main className="flex-grow">
        {/* Hero Inmersivo */}
        <section className="relative h-[60vh] sm:h-[70vh] flex items-end pb-20 justify-center">
          <Image
            src={tipologia.image}
            alt={tipologia.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-slate-900/40" />

          <div className="relative z-10 mx-auto max-w-7xl px-4 w-full text-center sm:px-6 lg:px-8">
            <span className="mb-4 inline-block rounded-full bg-brand-secondary/20 border border-brand-secondary/30 px-3 py-1 text-sm font-semibold tracking-wide text-brand-secondary backdrop-blur-md">
              {tipologia.category}
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-2 shadow-sm">
              {tipologia.name}
            </h1>
            <p className="text-lg sm:text-2xl text-white/90 font-medium">
              {tipologia.squareMeters} • {tipologia.bedrooms}
            </p>
          </div>
        </section>

        {/* Cuerpos de Detalles */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 -mt-10 relative z-20">
          <div className="grid gap-10 lg:grid-cols-3 lg:gap-16">
            <div className="lg:col-span-2 space-y-10">
              <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl shadow-slate-200/50 ring-1 ring-slate-100">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Detalles de la Tipología</h2>
                <p className="text-base sm:text-lg leading-relaxed text-slate-600 mb-8 font-medium">
                  {tipologia.description}
                </p>

                {tipologia.features && (
                  <div className="prose prose-slate max-w-none text-slate-600 prose-p:leading-8">
                    {tipologia.features.split('\n').map((paragraph: string, idx: number) => (
                      <p key={idx} className="mb-4 min-h-[1rem]">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar Sticky Call To Action */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 bg-white rounded-3xl p-8 shadow-xl shadow-brand-primary/10 ring-1 ring-brand-primary/20">
                <p className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-2">Precio Estimado</p>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl font-black text-slate-900">{tipologia.price}</span>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-slate-600">
                    <svg className="h-5 w-5 text-brand-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    <span className="font-medium">{tipologia.squareMeters}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <svg className="h-5 w-5 text-brand-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span className="font-medium">{tipologia.bedrooms}</span>
                  </div>
                </div>

                <Link 
                  href={`/contacto?subject=${encodeURIComponent('Consulta sobre ' + tipologia.name)}`}
                  className="w-full flex items-center justify-center rounded-2xl bg-brand-primary px-6 py-4 text-center text-sm font-bold text-white shadow-lg shadow-brand-primary/30 transition-all hover:bg-brand-primary/90 hover:scale-[1.02]"
                >
                  Consultar por esta Tipología
                </Link>
                
                <p className="text-xs text-center text-slate-400 mt-4">
                  Construyendo con Viviendas Triunfo asegurás los mejores materiales y garantía por escrito.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
