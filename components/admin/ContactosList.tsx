"use client";

import { useState } from "react";
import { deleteContactAction } from "@/app/actions/contact";

export interface ContactItem {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: string;
}

interface ContactosListProps {
  contactos: ContactItem[];
}

export default function ContactosList({ contactos }: ContactosListProps) {
  const [selectedContact, setSelectedContact] = useState<ContactItem | null>(null);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const cleanPhone = (phone?: string) => {
    if (!phone) return "";
    return phone.replace(/\D/g, "");
  };

  return (
    <div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow-sm ring-1 ring-black/5 sm:rounded-2xl bg-white border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-900 sm:pl-6">
                      Fecha
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">
                      Nombre
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">
                      Contacto
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">
                      Asunto
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">
                      Mensaje
                    </th>
                    <th scope="col" className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-slate-900 sm:pr-6">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {contactos.map((c) => (
                    <tr key={c._id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-slate-500 sm:pl-6">
                        {formatDate(c.createdAt)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-slate-900">
                        {c.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">
                        <a href={`mailto:${c.email}`} className="text-sky-600 hover:underline block font-medium">
                          {c.email}
                        </a>
                        {c.phone && <span className="text-xs text-slate-500 mt-0.5 block">{c.phone}</span>}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">
                        <span className="inline-flex items-center rounded-md bg-sky-50 px-2.5 py-1 text-xs font-medium text-slate-700 ring-1 ring-inset ring-sky-700/10">
                          {c.subject}
                        </span>
                      </td>
                      <td className="px-3 py-4 text-sm text-slate-500 max-w-xs">
                        <p className="line-clamp-2" title={c.message}>
                          {c.message}
                        </p>
                      </td>
                      <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedContact(c)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-sky-700 bg-sky-50 hover:bg-sky-100 transition-colors cursor-pointer"
                            title="Ver detalle de consulta"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            Ver
                          </button>

                          <form action={deleteContactAction.bind(null, c._id)}>
                            <button
                              type="submit"
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors cursor-pointer"
                              title="Eliminar consulta"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Eliminar
                            </button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {contactos.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-sm text-slate-500">
                        No hay consultas de contacto recientes.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Detalle de Consulta */}
      {selectedContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-slate-900/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del Modal */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="inline-flex items-center rounded-md bg-sky-50 px-2.5 py-1 text-xs font-medium text-slate-700 ring-1 ring-inset ring-sky-700/10 mb-2">
                  {selectedContact.subject}
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  {selectedContact.name}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Recibido el {formatDate(selectedContact.createdAt)}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedContact(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Información del Contacto */}
            <div className="my-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div>
                  <span className="text-xs font-medium text-slate-400 block">Correo Electrónico</span>
                  <a
                    href={`mailto:${selectedContact.email}`}
                    className="text-sm font-semibold text-sky-600 hover:underline break-all"
                  >
                    {selectedContact.email}
                  </a>
                </div>

                {selectedContact.phone && (
                  <div>
                    <span className="text-xs font-medium text-slate-400 block">Teléfono / WhatsApp</span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <a
                        href={`tel:${selectedContact.phone}`}
                        className="text-sm font-semibold text-slate-800 hover:text-sky-600"
                      >
                        {selectedContact.phone}
                      </a>
                      {cleanPhone(selectedContact.phone) && (
                        <a
                          href={`https://wa.me/${cleanPhone(selectedContact.phone)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-xs text-emerald-600 font-medium hover:underline"
                        >
                          WhatsApp ↗
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Mensaje Completo */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Mensaje Completo
                </h4>
                <div className="max-h-60 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50/50 p-4 text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {selectedContact.message}
                </div>
              </div>
            </div>

            {/* Footer del Modal */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <form
                action={async () => {
                  await deleteContactAction(selectedContact._id);
                  setSelectedContact(null);
                }}
              >
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Eliminar consulta
                </button>
              </form>

              <button
                type="button"
                onClick={() => setSelectedContact(null)}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
