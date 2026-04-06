"use client";

import { createTipologia, updateTipologia } from "@/app/actions/tipologias";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ITipologia } from "@/models/Tipologia";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function TipologiaForm({
  initialData,
  pkgId,
}: {
  initialData?: ITipologia;
  pkgId?: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [featuresContent, setFeaturesContent] = useState(initialData?.features || "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    try {
      if (initialData && pkgId) {
        await updateTipologia(pkgId, formData);
      } else {
        await createTipologia(formData);
      }
      router.push("/admin");
    } catch (error) {
      console.error(error);
      alert("Error guardando la tipología");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-white p-6 sm:p-8 rounded-2xl shadow-sm ring-1 ring-slate-200">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-slate-700">Nombre de la Tipología</label>
          <input required defaultValue={initialData?.name} type="text" name="name" placeholder="Ej: Americana" className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary" />
        </div>
        
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-slate-700">Imagen Principal (Sube tu archivo)</label>
          <input 
            required={!initialData?.image} 
            type="file" 
            accept="image/*" 
            name="image" 
            className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-2 text-sm outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-primary/10 file:text-brand-primary hover:file:bg-brand-primary/20" 
          />
          {initialData?.image && (
            <p className="mt-2 text-xs text-slate-500">
              Imagen actual: <a href={initialData.image} target="_blank" rel="noreferrer" className="text-brand-primary underline break-all">Ver imagen</a>. Sube una nueva para reemplazarla.
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-slate-700">Imagen del Plano (Opcional)</label>
          <input 
            type="file" 
            accept="image/*" 
            name="planImage" 
            className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-2 text-sm outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-primary/10 file:text-brand-primary hover:file:bg-brand-primary/20" 
          />
          {initialData?.planImage && (
            <p className="mt-2 text-xs text-slate-500">
              Plano actual: <a href={initialData.planImage} target="_blank" rel="noreferrer" className="text-brand-primary underline break-all">Ver plano</a>. Sube uno nuevo para reemplazarlo.
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Metros Cuadrados</label>
          <input required defaultValue={initialData?.squareMeters} type="text" name="squareMeters" placeholder="Ej: 80 m²" className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary" />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Dormitorios</label>
          <input required defaultValue={initialData?.bedrooms} type="text" name="bedrooms" placeholder="Ej: 3 Dormitorios" className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary" />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Precio</label>
          <input required defaultValue={initialData?.price} type="text" name="price" placeholder="Ej: Consultar" className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary" />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Categoría (Tag)</label>
          <input required defaultValue={initialData?.category} type="text" name="category" placeholder="Ej: Prefabricada" className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary" />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-slate-700">Descripción Corta</label>
          <textarea required defaultValue={initialData?.description} name="description" rows={3} className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary" />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-2">Características y Descripción Completa (Soporta imágenes y formato)</label>
          <input type="hidden" name="features" value={featuresContent} />
          <div className="bg-white rounded-xl overflow-hidden [&_.ql-editor]:min-h-[250px] [&_.ql-toolbar]:rounded-t-xl [&_.ql-container]:rounded-b-xl [&_.ql-container]:text-base [&_.ql-editor]:text-slate-600">
            <ReactQuill 
              theme="snow" 
              value={featuresContent} 
              onChange={setFeaturesContent} 
              placeholder="Escribe la descripción completa aquí, añade texto enriquecido, listas, o inserta imágenes..."
            />
          </div>
        </div>

        <div className="sm:col-span-2 flex items-center gap-3 bg-amber-50 p-4 rounded-xl border border-amber-100">
          <input 
            type="checkbox" 
            name="isFeatured" 
            id="isFeatured" 
            defaultChecked={initialData?.isFeatured} 
            className="h-5 w-5 rounded border-slate-300 text-brand-primary focus:ring-brand-primary cursor-pointer" 
          />
          <label htmlFor="isFeatured" className="text-sm font-bold text-amber-900 cursor-pointer select-none">
            ¿Hacer Destacado? (Muestra esta tipología prioritaria en la página de inicio)
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="rounded-xl px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-brand-primary px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-primary/90 disabled:opacity-70"
        >
          {loading ? "Guardando..." : "Guardar Tipología"}
        </button>
      </div>
    </form>
  );
}
