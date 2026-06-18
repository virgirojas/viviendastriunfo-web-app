import Image from "next/image";

export default function PreviewPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-200/60 via-slate-50 to-slate-50 pointer-events-none" />
      
      <div className="z-10 flex flex-col items-center text-center space-y-16">
        {/* Logo container */}
        <div className="relative w-72 h-40 md:w-96 md:h-48 drop-shadow-xl transition-all duration-700 hover:scale-105">
          <Image
            src="/logo_final.png"
            alt="Viviendas Triunfo Logo"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Text content */}
        <div className="space-y-8">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 uppercase">
            Próximamente
          </h1>
          
          <div className="w-24 h-1.5 bg-slate-900 rounded-full mx-auto" />
          
          <p className="text-xl md:text-2xl text-slate-600 font-light max-w-lg mx-auto leading-relaxed">
            Estamos creando una nueva experiencia digital para ti. Muy pronto podrás descubrir todos nuestros modelos y novedades.
          </p>
        </div>
      </div>
    </div>
  );
}
