import connectMongo from "@/lib/mongodb";
import PageContent from "@/models/PageContent";
import { savePageContentAction } from "@/app/actions/content";

export default async function AdminContenidos() {
  await connectMongo();
  let nosotros = await PageContent.findOne({ pageKey: 'nosotros' });

  if (!nosotros) {
    nosotros = { title: "Nuestra Historia", content: "Viviendas Triunfo: Transformando sueños en hogares.\n\nSomos una empresa constructora con amplia trayectoria..." };
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Gestor de Contenidos</h1>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm max-w-4xl">
        <h2 className="mb-4 text-lg font-semibold border-b pb-2">Editar Sección: Nosotros</h2>
        <form action={savePageContentAction} className="space-y-6">
          <input type="hidden" name="pageKey" value="nosotros" />
          
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Título de la Página</label>
            <input 
              type="text" 
              name="title" 
              defaultValue={nosotros.title} 
              required 
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-brand-primary" 
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Contenido (Párrafos)</label>
            <textarea 
              name="content" 
              defaultValue={nosotros.content} 
              required 
              rows={15} 
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-brand-primary whitespace-pre-wrap font-sans text-base leading-relaxed" 
            />
            <p className="mt-2 text-xs text-slate-500">Puedes usar saltos de línea y se separarán automáticamente en párrafos en la página pública.</p>
          </div>

          <button type="submit" className="w-full sm:w-auto rounded-xl bg-slate-900 px-8 py-3 font-bold text-white transition hover:bg-brand-primary hover:text-slate-900">
            Guardar Cambios Totales
          </button>
        </form>
      </div>
    </div>
  );
}
