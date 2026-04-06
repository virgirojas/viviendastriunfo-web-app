import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer
            id="contacto"
            className="relative overflow-hidden border-t border-brand-primary bg-black text-slate-300"
        >
            <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mb-12 grid gap-8 border-l-4 border-brand-primary bg-white/5 p-8 md:grid-cols-[1.3fr_0.7fr]">
                    <div>
                        <span className="inline-flex rounded-none border border-brand-primary/20 bg-brand-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-brand-primary">
                            Tu casa propia empieza acá
                        </span>

                        <h2 className="mt-4 max-w-2xl text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">
                            Construimos tu hogar con la mejor calidad del mercado
                        </h2>

                        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 font-medium sm:text-base">
                            Tipologías seleccionadas, asesoramiento personalizado y materiales pensados
                            para convertir tu proyecto en realidad de forma rápida y segura.
                        </p>
                    </div>

                    <div className="flex flex-col justify-center gap-4">
                        <a
                            href="https://wa.me/5493518132775"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center bg-brand-primary px-5 py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-white hover:text-black"
                        >
                            Hablar por WhatsApp
                        </a>

                        <Link
                            href="/contacto"
                            className="inline-flex items-center justify-center border-2 border-white/20 bg-transparent px-5 py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-white/10"
                        >
                            Solicitar asesoramiento
                        </Link>
                    </div>
                </div>

                <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
                    <div>
                        <Link href="/" className="inline-block transition hover:opacity-80">
                            <Image
                                src="/logo_final.png"
                                alt="Viviendas Triunfo Logo"
                                width={180}
                                height={60}
                                className="h-14 w-auto object-contain brightness-200 contrast-200"
                            />
                        </Link>

                        <p className="mt-6 max-w-md text-sm leading-7 text-slate-400 font-medium">
                            Construimos viviendas prefabricadas con atención cercana,
                            materiales de primera y una experiencia de compra sencilla y confiable.
                        </p>

                        <div className="mt-6 flex flex-wrap gap-2">
                            <span className="border border-white/20 bg-white/5 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                                Financiación Propia
                            </span>
                            <span className="border border-white/20 bg-white/5 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                                Llave en Mano
                            </span>
                        </div>

                        <div className="mt-6 flex gap-3">
                            <a
                                href="#"
                                className="border border-white/20 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-300 transition hover:border-brand-primary hover:text-brand-primary"
                            >
                                Instagram
                            </a>
                            <a
                                href="#"
                                className="border border-white/20 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-300 transition hover:border-brand-primary hover:text-brand-primary"
                            >
                                Facebook
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-base font-bold uppercase tracking-wider text-white border-b border-white/10 pb-2">Explorar</h3>

                        <ul className="mt-5 space-y-4 text-sm text-slate-400 font-medium">
                            <li>
                                <a href="#destacados" className="transition hover:text-brand-primary">Tipologías Destacadas</a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-base font-bold uppercase tracking-wider text-white border-b border-white/10 pb-2">Empresa</h3>

                        <ul className="mt-5 space-y-4 text-sm text-slate-400 font-medium">
                            <li>
                                <a href="/nosotros" className="transition hover:text-brand-primary">Nosotros</a>
                            </li>
                            <li>
                                <a href="/contacto" className="transition hover:text-brand-primary">Contacto</a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-base font-bold uppercase tracking-wider text-white border-b border-white/10 pb-2">Llamanos</h3>

                        <div className="mt-5 space-y-6 text-sm text-slate-400 font-medium">
                            <div>
                                <p className="text-xs uppercase tracking-[0.18em] text-brand-secondary">
                                    Email
                                </p>
                                <a
                                    href="mailto:contacto@viviendastriunfo.com.ar"
                                    className="mt-1 block text-white transition hover:text-brand-primary"
                                >
                                    contacto@viviendastriunfo.com.ar
                                </a>
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-[0.18em] text-brand-secondary">
                                    Ventas
                                </p>
                                <a
                                    href="tel:+5493518132775"
                                    className="mt-1 block text-white transition hover:text-brand-primary"
                                >
                                    +54 9 3518 13-2775
                                </a>
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-[0.18em] text-brand-secondary">
                                    Dirección
                                </p>
                                <a
                                    href="https://maps.app.goo.gl/ou8vAbfaykWhh1t17"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-1 block text-white transition hover:text-brand-primary"
                                >
                                    Ramón Aberastain Oro 1936 - Córdoba
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs uppercase tracking-widest text-slate-500 font-bold md:flex-row md:items-center md:justify-between">
                    <p>© {new Date().getFullYear()} Viviendas Triunfo. Todos los derechos reservados.</p>

                    <div className="flex flex-wrap gap-4">
                        <a href="/privacidad" className="transition hover:text-brand-primary">
                            Privacidad
                        </a>
                        <a href="/terminos" className="transition hover:text-brand-primary">
                            Términos
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}