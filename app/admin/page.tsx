import Link from "next/link";
import connectMongo from "@/lib/mongodb";
import Tipologia from "@/models/Tipologia";
import { deleteTipologia } from "@/app/actions/tipologias";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  await connectMongo();
  const tipologias = await Tipologia.find().sort({ createdAt: -1 });

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Tipologías de Viviendas</h1>
          <p className="mt-1 text-sm text-slate-500">
            Administra los diferentes modelos de casas que se muestran en la web.
          </p>
        </div>
        <div className="mt-4 sm:ml-4 sm:mt-0">
          <Link
            href="/admin/new"
            className="inline-flex items-center justify-center rounded-xl bg-brand-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-primary/90"
          >
            + Nueva Tipología
          </Link>
        </div>
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-2xl bg-white">
              <table className="min-w-full divide-y divide-slate-300">
                <thead className="bg-slate-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-900 sm:pl-6">Nombre</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">Metros Cuadrados</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">Dormitorios</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">Precio</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">Categoría</th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6"><span className="sr-only">Acciones</span></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {tipologias.map((tipologia) => (
                    <tr key={tipologia._id.toString()}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-slate-900 sm:pl-6 flex items-center gap-2">
                        {tipologia.isFeatured && <span title="Destacado" className="text-amber-400">⭐️</span>}
                        {tipologia.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">{tipologia.squareMeters}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">{tipologia.bedrooms}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">{tipologia.price}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">
                        <span className="inline-flex items-center rounded-md bg-sky-50 px-2 py-1 text-xs font-medium text-brand-primary ring-1 ring-inset ring-sky-700/10">
                          {tipologia.category}
                        </span>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 flex justify-end gap-4">
                        <Link href={`/admin/edit/${tipologia._id}`} className="text-brand-secondary hover:text-brand-primary">
                          Editar
                        </Link>
                        <form action={async () => {
                          "use server";
                          await deleteTipologia(tipologia._id.toString());
                        }}>
                          <button type="submit" className="text-red-500 hover:text-red-700 font-medium">Borrar</button>
                        </form>
                      </td>
                    </tr>
                  ))}
                  {tipologias.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-sm text-slate-500">No hay tipologías cargadas.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
