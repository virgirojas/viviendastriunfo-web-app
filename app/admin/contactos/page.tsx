import connectMongo from "@/lib/mongodb";
import ContactQuery from "@/models/ContactQuery";

export const dynamic = "force-dynamic";

export default async function AdminContactosDashboard() {
  await connectMongo();
  const contactos = await ContactQuery.find().sort({ createdAt: -1 });

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Consultas de Contacto</h1>
          <p className="mt-1 text-sm text-slate-500">
            Revisá los mensajes enviados por los clientes a través del formulario de la web.
          </p>
        </div>
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-2xl bg-white">
              <table className="min-w-full divide-y divide-slate-300">
                <thead className="bg-slate-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-900 sm:pl-6">Fecha</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">Nombre</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">Contacto</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">Asunto</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">Mensaje</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {contactos.map((c) => (
                    <tr key={c._id.toString()}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-slate-500 sm:pl-6">
                        {new Date(c.createdAt).toLocaleDateString("es-AR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-slate-900">{c.name}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">
                        <a href={`mailto:${c.email}`} className="text-brand-secondary hover:underline block">{c.email}</a>
                        {c.phone && <span className="text-xs mt-1 block">{c.phone}</span>}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">
                        <span className="inline-flex items-center rounded-md bg-sky-50 px-2 py-1 text-xs font-medium text-brand-primary ring-1 ring-inset ring-sky-700/10">
                          {c.subject}
                        </span>
                      </td>
                      <td className="px-3 py-4 text-sm text-slate-500 max-w-sm">
                        <p className="line-clamp-3" title={c.message}>{c.message}</p>
                      </td>
                    </tr>
                  ))}
                  {contactos.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-sm text-slate-500">No hay consultas de contacto recientes.</td>
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
