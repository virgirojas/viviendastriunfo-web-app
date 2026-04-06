export default function HeroSearch() {
  return (
    <section className="relative overflow-hidden bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-32 items-center">
        <div className="text-white">
          <span className="inline-block border-l-4 border-brand-primary pl-4 py-1 text-sm font-bold uppercase tracking-widest text-brand-primary mb-4 bg-black/20 pr-4 backdrop-blur-sm">
            Tu oportunidad para dejar de alquilar
          </span>

          <h1 className="text-4xl font-black uppercase leading-tight tracking-tight sm:text-5xl lg:text-7xl mb-6">
            Construimos tu casa.
          </h1>

          <p className="max-w-xl text-base font-medium text-white/90 sm:text-lg mb-10 border-l-2 border-white/20 pl-4">
            Cumplimos tu sueño de la casa propia en 25 días con la mejor financiación.
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="#destacados" className="inline-flex items-center justify-center rounded-none bg-brand-primary px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-white hover:text-black">
              Ver Modelos
            </a>

            <a href="/contacto" className="inline-flex items-center justify-center rounded-none border-2 border-brand-primary bg-transparent px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-brand-primary">
              Contacto
            </a>
          </div>
        </div>

        {/* 
        <div className="justify-self-end w-full max-w-md hidden lg:block">
          <div className="rounded-none bg-black/80 backdrop-blur-md p-8 border-t-4 border-brand-primary shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="mb-6">
              <p className="text-2xl font-bold uppercase text-white tracking-wide">
                Buscá tu modelo
              </p>
              <p className="text-sm font-medium text-brand-secondary mt-1">
                Encontrá la tipología exacta para vos.
              </p>
            </div>

            <form action="/tipologias" className="grid gap-5">
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-brand-secondary">
                  Estilo o Categoría
                </label>
                <select name="category" className="w-full rounded-none border border-white/20 bg-white/5 text-white px-4 py-3 text-sm outline-none transition focus:border-brand-primary focus:bg-white/10">
                  <option value="" className="text-black">Todos los estilos</option>
                  <option value="Prefabricada" className="text-black">Línea Clásica</option>
                  <option value="Minimalista" className="text-black">Línea Minimalista</option>
                  <option value="Madera" className="text-black">Línea Cabaña</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-brand-secondary">
                    Dormitorios
                  </label>
                  <select name="bedrooms" className="w-full rounded-none border border-white/20 bg-white/5 text-white px-4 py-3 text-sm outline-none transition focus:border-brand-primary focus:bg-white/10">
                    <option value="" className="text-black">Cualquiera</option>
                    <option value="1" className="text-black">1 Dormitorio</option>
                    <option value="2" className="text-black">2 Dormitorios</option>
                    <option value="3+" className="text-black">3 o más</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-brand-secondary">
                    Presupuesto
                  </label>
                  <select name="budget" className="w-full rounded-none border border-white/20 bg-white/5 text-white px-4 py-3 text-sm outline-none transition focus:border-brand-primary focus:bg-white/10">
                    <option value="" className="text-black">Sin límite</option>
                    <option value="low" className="text-black">Económico</option>
                    <option value="medium" className="text-black">Medio</option>
                    <option value="high" className="text-black">Premium</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="mt-4 w-full rounded-none bg-brand-primary px-5 py-4 text-sm font-bold uppercase text-white tracking-widest transition hover:bg-white hover:text-black">
                Buscar Tipologías
              </button>
            </form>
          </div>
        </div> 
        */}
      </div>
    </section>
  );
}
