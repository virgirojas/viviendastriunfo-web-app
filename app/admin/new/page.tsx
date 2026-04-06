import TipologiaForm from "@/components/admin/TipologiaForm";

export default function NewTipologiaPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Crear Nueva Tipología</h1>
        <p className="mt-1 text-sm text-slate-500">
          Completa los detalles para agregar un nuevo modelo de vivienda a la web.
        </p>
      </div>
      <TipologiaForm />
    </div>
  );
}
