import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AllTipologias from "@/components/home/AllTipologias";

export default async function TipologiasPage(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParams = await props.searchParams;
  const q = typeof searchParams.q === 'string' ? searchParams.q : "";
  const bedrooms = typeof searchParams.bedrooms === 'string' ? searchParams.bedrooms : "";
  const category = typeof searchParams.category === 'string' ? searchParams.category : "";
  const budget = typeof searchParams.budget === 'string' ? searchParams.budget : "";
  
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Header />
      <main className="flex-grow">
        <AllTipologias searchParamsParsed={{ q, bedrooms, category, budget }} />
      </main>
      <Footer />
    </div>
  );
}
