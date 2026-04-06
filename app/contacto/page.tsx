"use client";

import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { submitContact } from "@/app/actions/contact";

export default function ContactoPage() {
  const [isPending, setIsPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [captchaActive, setCaptchaActive] = useState({ a: 0, b: 0 });
  const [userMath, setUserMath] = useState("");

  useEffect(() => {
    setCaptchaActive({ 
      a: Math.floor(Math.random() * 10) + 1, 
      b: Math.floor(Math.random() * 10) + 1 
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (parseInt(userMath) !== captchaActive.a + captchaActive.b) {
      setError("La respuesta matemática de seguridad es incorrecta.");
      return;
    }

    setIsPending(true);

    const formData = new FormData(e.currentTarget);
    const response = await submitContact(formData);

    if (response.success) {
      setSuccess(true);
      setCaptchaActive({ 
        a: Math.floor(Math.random() * 10) + 1, 
        b: Math.floor(Math.random() * 10) + 1 
      });
      setUserMath("");
    } else {
      setError(response.error || "Algo salió mal.");
    }
    setIsPending(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="pointer-events-none absolute left-[-10%] top-0 h-[800px] w-[800px] bg-[radial-gradient(ellipse_at_top_right,var(--color-brand-secondary)_0.18,transparent_50%)] opacity-30" />
        <div className="pointer-events-none absolute right-[-10%] bottom-0 h-[800px] w-[800px] bg-[radial-gradient(circle_at_bottom_left,var(--color-brand-accent)_0.12,transparent_40%)] opacity-20" />
        
        <div className="relative z-10 w-full max-w-3xl bg-white/70 backdrop-blur-xl rounded-[2.5rem] border border-white/20 shadow-2xl p-8 sm:p-14">
          <div className="mb-12 text-center">
            <span className="inline-flex rounded-full border border-brand-secondary/20 bg-brand-secondary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-secondary">
              Atención 24/7
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">Contáctanos</h1>
            <p className="mt-4 text-lg text-slate-600 max-w-xl mx-auto">
              Estamos aquí para ayudarte a planificar el viaje de tus sueños. Déjanos tu consulta y un asesor especializado te responderá a la brevedad.
            </p>
          </div>

          {success ? (
            <div className="rounded-3xl bg-green-50 p-8 text-center shadow-inner border border-green-100">
              <svg className="mx-auto h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-4 text-2xl font-bold text-green-800">¡Mensaje enviado con éxito!</h3>
              <p className="mt-2 text-base text-green-700">Nos pondremos en contacto contigo lo antes posible para asesorarte sobre tu nueva casa.</p>
              <button 
                onClick={() => setSuccess(false)}
                className="mt-8 inline-flex rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 hover:scale-[1.02]"
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700 border border-red-100 flex items-center gap-3">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              )}
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-slate-700">Nombre completo <span className="text-red-500">*</span></label>
                  <input required type="text" name="name" id="name" className="mt-2 block w-full rounded-2xl border border-slate-200 bg-white/50 px-4 py-3.5 text-slate-900 shadow-sm focus:border-brand-primary focus:outline-none focus:ring-4 focus:ring-brand-primary/10 transition" placeholder="Ej. Juan Pérez" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700">Correo electrónico <span className="text-red-500">*</span></label>
                  <input required type="email" name="email" id="email" className="mt-2 block w-full rounded-2xl border border-slate-200 bg-white/50 px-4 py-3.5 text-slate-900 shadow-sm focus:border-brand-primary focus:outline-none focus:ring-4 focus:ring-brand-primary/10 transition" placeholder="juan@ejemplo.com" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-slate-700">Teléfono (Opcional)</label>
                  <input type="tel" name="phone" id="phone" className="mt-2 block w-full rounded-2xl border border-slate-200 bg-white/50 px-4 py-3.5 text-slate-900 shadow-sm focus:border-brand-primary focus:outline-none focus:ring-4 focus:ring-brand-primary/10 transition" placeholder="+54 9 351..." />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-slate-700">Asunto <span className="text-red-500">*</span></label>
                  <select required name="subject" id="subject" className="mt-2 block w-full rounded-2xl border border-slate-200 bg-white/50 px-4 py-3.5 text-slate-900 shadow-sm focus:border-brand-primary focus:outline-none focus:ring-4 focus:ring-brand-primary/10 transition appearance-none">
                    <option value="">Selecciona el motivo de consulta</option>
                    <option value="Cotización">Cotización</option>
                    <option value="Consulta general">Consulta general</option>
                    <option value="Soporte y problemas">Soporte o reclamos</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-slate-700">Mensaje detallado <span className="text-red-500">*</span></label>
                <textarea required name="message" id="message" rows={5} className="mt-2 block w-full rounded-2xl border border-slate-200 bg-white/50 px-4 py-3.5 text-slate-900 shadow-sm focus:border-brand-primary focus:outline-none focus:ring-4 focus:ring-brand-primary/10 transition resize-none" placeholder="¿Cómo podemos ayudarte? Contanos si ya tienes fecha, destino pensado, o detalles importantes."></textarea>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white/40 px-5 py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <label htmlFor="captcha" className="block text-sm font-semibold text-slate-700">Verificación de seguridad <span className="text-red-500">*</span></label>
                    <span className="text-xs text-slate-500">¿Cuánto es {captchaActive.a} + {captchaActive.b}?</span>
                  </div>
                </div>
                <input 
                  required 
                  type="number" 
                  name="captcha" 
                  id="captcha" 
                  value={userMath}
                  onChange={(e) => setUserMath(e.target.value)}
                  className="block w-24 text-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition" 
                  placeholder="?" 
                />
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full rounded-2xl bg-brand-primary px-5 py-4 text-center text-sm font-bold text-white shadow-[0_10px_30px_-10px_var(--color-brand-primary)] transition-all hover:scale-[1.01] hover:bg-brand-primary/95 disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Procesando envío...
                  </span>
                ) : (
                  "Enviar consulta"
                )}
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
