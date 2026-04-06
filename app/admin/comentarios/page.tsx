import connectMongo from "@/lib/mongodb";
import Review from "@/models/Review";
import { createReviewAction, deleteReviewAction, toggleReviewActiveAction } from "@/app/actions/reviews";

export default async function AdminComentarios() {
  await connectMongo();
  const reviews = await Review.find().sort({ createdAt: -1 });

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Gestión de Reseñas</h1>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_2fr]">
        {/* Formulario Crear */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">Cargar nueva reseña</h2>
          <form action={createReviewAction} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Nombre del Cliente</label>
              <input type="text" name="clientName" required className="w-full rounded-xl border border-slate-200 px-4 py-2 outline-none focus:border-brand-primary" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Comentario</label>
              <textarea name="reviewText" required rows={4} className="w-full rounded-xl border border-slate-200 px-4 py-2 outline-none focus:border-brand-primary" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Calificación (Estrellas)</label>
              <select name="rating" className="w-full rounded-xl border border-slate-200 px-4 py-2 outline-none focus:border-brand-primary">
                <option value="5">5 Estrellas</option>
                <option value="4">4 Estrellas</option>
                <option value="3">3 Estrellas</option>
                <option value="2">2 Estrellas</option>
                <option value="1">1 Estrella</option>
              </select>
            </div>
            <button type="submit" className="w-full rounded-xl bg-slate-900 px-4 py-2 font-semibold text-white transition hover:bg-slate-800">
              Guardar Reseña
            </button>
          </form>
        </div>

        {/* Lista de Reseñas */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-6 py-4">Cliente / Estrellas</th>
                <th className="px-6 py-4">Comentario</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reviews.map((r) => (
                <tr key={r._id.toString()} className="transition hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900">{r.clientName}</div>
                    <div className="text-brand-primary">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
                  </td>
                  <td className="px-6 py-4 max-w-xs">{r.reviewText}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${r.isActive ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'}`}>
                      {r.isActive ? 'Visible' : 'Oculta'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right flex items-center justify-end gap-4 h-full">
                    <form action={toggleReviewActiveAction.bind(null, r._id.toString(), r.isActive)}>
                      <button type="submit" className="text-slate-500 hover:text-brand-primary underline underline-offset-2">Estado</button>
                    </form>
                    <form action={deleteReviewAction.bind(null, r._id.toString())}>
                      <button type="submit" className="text-red-500 hover:text-red-700 underline underline-offset-2">Borrar</button>
                    </form>
                  </td>
                </tr>
              ))}
              {reviews.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                    No hay reseñas cargadas aún.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
