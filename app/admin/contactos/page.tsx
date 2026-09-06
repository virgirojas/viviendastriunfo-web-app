import connectMongo from "@/lib/mongodb";
import ContactQuery from "@/models/ContactQuery";
import ContactosList, { ContactItem } from "@/components/admin/ContactosList";

export const dynamic = "force-dynamic";

export default async function AdminContactosDashboard() {
  await connectMongo();
  const rawContactos = await ContactQuery.find().sort({ createdAt: -1 }).lean();

  const contactos: ContactItem[] = rawContactos.map((c) => ({
    _id: (c._id as unknown as { toString: () => string }).toString(),
    name: c.name,
    email: c.email,
    phone: c.phone || "",
    subject: c.subject,
    message: c.message,
    createdAt: c.createdAt ? new Date(c.createdAt).toISOString() : new Date().toISOString(),
  }));

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

      <ContactosList contactos={contactos} />
    </div>
  );
}


