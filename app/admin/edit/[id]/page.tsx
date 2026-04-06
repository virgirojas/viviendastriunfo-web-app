import TipologiaForm from "@/components/admin/TipologiaForm";
import connectMongo from "@/lib/mongodb";
import Tipologia from "@/models/Tipologia";
import { notFound } from "next/navigation";

export default async function EditTipologiaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectMongo();
  const tipologia = await Tipologia.findById(id);

  if (!tipologia) {
    notFound();
  }

  // Convert Mongoose doc to lean object for the client component
  const initialData = {
    name: tipologia.name,
    squareMeters: tipologia.squareMeters,
    bedrooms: tipologia.bedrooms,
    price: tipologia.price,
    image: tipologia.image,
    description: tipologia.description,
    features: tipologia.features,
    category: tipologia.category,
    isFeatured: tipologia.isFeatured,
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Editar Tipología</h1>
        <p className="mt-1 text-sm text-slate-500">
          Actualiza los datos del modelo de vivienda seleccionado.
        </p>
      </div>
      <TipologiaForm initialData={initialData} pkgId={tipologia._id.toString()} />
    </div>
  );
}
