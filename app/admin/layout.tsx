import Link from "next/link";
import Image from "next/image";
import { logoutAction } from "@/app/actions/auth";
import { cookies } from "next/headers";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.has('auth_token');
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-slate-900 border-b border-white/10 text-white sticky top-0 z-50">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Image
              src="/logo_final.png"
              alt="Viviendas Triunfo Logo"
              width={180}
              height={60}
              className="h-8 w-auto object-contain brightness-0 invert"
            />
            <span className="rounded-md bg-brand-secondary/20 px-2 py-1 text-[10px] font-bold tracking-widest text-brand-secondary">
              ADMIN
            </span>
          </div>
          {isLoggedIn && (
            <nav className="flex items-center gap-6">
              <Link href="/admin" className="text-sm font-medium text-slate-300 hover:text-white transition">Tipologías</Link>
              <Link href="/admin/contactos" className="text-sm font-medium text-slate-300 hover:text-white transition">Contactos</Link>
              <Link href="/admin/comentarios" className="text-sm font-medium text-slate-300 hover:text-white transition">Reseñas</Link>
              <Link href="/admin/contenidos" className="text-sm font-medium text-slate-300 hover:text-brand-primary transition">Contenidos</Link>
              <Link href="/" className="text-sm font-medium text-slate-300 hover:text-brand-secondary transition">Volver a la Web</Link>
              <form action={logoutAction}>
                <button type="submit" className="text-sm font-medium text-red-400 hover:text-red-300 transition">Cerrar Sesión</button>
              </form>
            </nav>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
