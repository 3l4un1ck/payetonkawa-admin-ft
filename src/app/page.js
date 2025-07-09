"use client";
import Link from "next/link";
import { UserIcon, PlusIcon, ShoppingBagIcon, ClipboardDocumentListIcon, ReceiptPercentIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomeDashboard() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (!token) {
        router.replace("/login");
      }
    }
  }, [router]);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white py-12 px-4">
      <h1 className="text-4xl font-extrabold text-emerald-700 mb-2 text-center">Tableau de bord - Gestion de stock</h1>
      <p className="text-green-500 text-lg mb-10 text-center">Bienvenue sur votre espace d&apos;administration. Que souhaitez-vous faire ?</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-3xl">
        <Link href="/clients" className="group rounded-2xl border border-green-200 bg-green-50 hover:bg-emerald-50 shadow-md p-8 flex flex-col items-center transition-all hover:scale-105">
          <UserIcon className="w-12 h-12 text-emerald-500 mb-3 group-hover:text-emerald-700 transition" />
          <span className="text-xl font-bold text-emerald-700 mb-1">Liste des clients</span>
          <span className="text-green-500 text-sm">Voir et gérer tous les clients</span>
        </Link>
        <Link href="/clients/new" className="group rounded-2xl border border-green-200 bg-green-50 hover:bg-emerald-50 shadow-md p-8 flex flex-col items-center transition-all hover:scale-105">
          <PlusIcon className="w-12 h-12 text-emerald-500 mb-3 group-hover:text-emerald-700 transition" />
          <span className="text-xl font-bold text-emerald-700 mb-1">Ajouter un client</span>
          <span className="text-green-500 text-sm">Créer un nouveau client</span>
        </Link>
        <Link href="/admin/products/new" className="group rounded-2xl border border-green-200 bg-green-50 hover:bg-emerald-50 shadow-md p-8 flex flex-col items-center transition-all hover:scale-105">
          <ShoppingBagIcon className="w-12 h-12 text-emerald-500 mb-3 group-hover:text-emerald-700 transition" />
          <span className="text-xl font-bold text-emerald-700 mb-1">Ajouter un produit</span>
          <span className="text-green-500 text-sm">Enregistrer un nouveau produit</span>
        </Link>
        <Link href="/admin/products" className="group rounded-2xl border border-green-200 bg-green-50 hover:bg-emerald-50 shadow-md p-8 flex flex-col items-center transition-all hover:scale-105">
          <ClipboardDocumentListIcon className="w-12 h-12 text-emerald-500 mb-3 group-hover:text-emerald-700 transition" />
          <span className="text-xl font-bold text-emerald-700 mb-1">Liste des produits</span>
          <span className="text-green-500 text-sm">Voir et gérer tous les produits</span>
        </Link>
        <div className="flex flex-col items-center w-full max-w-md mx-auto gap-8">
          <Link href="/admin/orders" className="group rounded-2xl border border-green-200 bg-green-50 hover:bg-emerald-50 shadow-md p-8 flex flex-col items-center transition-all hover:scale-105 w-full">
            <ReceiptPercentIcon className="w-12 h-12 text-emerald-500 mb-3 group-hover:text-emerald-700 transition" />
            <span className="text-xl font-bold text-emerald-700 mb-1">Liste des commandes</span>
            <span className="text-green-500 text-sm">Voir et gérer toutes les commandes</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
