import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-white text-emerald-700 shadow-sm py-4 px-6 flex items-center justify-between border-b border-emerald-200">
      <div className="flex items-center gap-3">
        <span className="font-extrabold text-2xl tracking-wide">☕ PayeTonKawa</span>
      </div>
      <nav className="flex gap-6 text-lg font-medium">
        <Link href="/" className="hover:underline hover:text-emerald-400 transition">Accueil</Link>
        <Link href="/clients" className="hover:underline hover:text-emerald-400 transition">Clients</Link>
        <Link href="/admin/products" className="hover:underline hover:text-emerald-400 transition">Produits</Link>
        <Link href="/admin/orders" className="hover:underline hover:text-emerald-400 transition">Commandes</Link>
      </nav>
    </header>
  );
} 