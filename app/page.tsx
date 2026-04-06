import FeaturedTipologias from "@/components/home/FeaturedTipologias";
import HeroSearch from "@/components/home/HeroSearch";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

import CustomerReviews from "@/components/home/CustomerReviews";

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <main>
        <HeroSearch />
        <FeaturedTipologias />
        <CustomerReviews />
      </main>

      <Footer />
    </div>
  );
}
