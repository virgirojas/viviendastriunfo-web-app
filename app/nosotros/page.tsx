import connectMongo from "@/lib/mongodb";
import PageContent from "@/models/PageContent";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default async function Nosotros() {
  await connectMongo();
  let nosotros = await PageContent.findOne({ pageKey: 'nosotros' });

  if (!nosotros) {
    nosotros = {
      title: "Sobre Viviendas Triunfo",
      content: "La información institucional aún no ha sido cargada."
    };
  }

  // Pre-process newlines into paragraphs
  const paragraphs = nosotros.content.split('\n').filter((p: string) => p.trim() !== '');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="py-20 sm:py-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 border-l-4 border-brand-primary pl-6">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-secondary">
              LA EMPRESA
            </span>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl uppercase">
              {nosotros.title}
            </h1>
          </div>
          <div className="prose prose-lg text-slate-700">
            {paragraphs.map((p: string, idx: number) => (
              <p key={idx} className="mb-6 leading-relaxed bg-white p-6 rounded-lg shadow-sm border border-slate-100">{p}</p>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
