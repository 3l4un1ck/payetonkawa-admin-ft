"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const API_URL = "http://138.68.243.1:8008/api/clients";

export default function ClientsList() {
  const router = useRouter();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Pas de token → on redirige vers la page de login
      return router.push("/login");
    }

    fetch(API_URL, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (res.status === 401 || res.status === 403) {
          // Token invalide / expiré → on purge et on redirige
          localStorage.removeItem("token");
          return router.push("/login");
        }
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.detail || "Erreur serveur");
        }
        return res.json();
      })
      .then((data) => setClients(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Chargement des clients…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">Erreur : {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-white px-2 py-8 sm:px-4 sm:py-12">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-10 border border-green-200">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 border-b border-green-200 pb-4 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-emerald-700 tracking-tight">Gestion des stocks</h1>
            <p className="text-green-500 text-sm mt-1">Liste des clients enregistrés dans le système.</p>
          </div>
          <Link
            href="/clients/new"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg shadow font-medium transition-colors border border-green-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.75v14.5m7.25-7.25H4.75" />
            </svg>
            <span>Ajouter</span>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-emerald-700 rounded-xl bg-white border border-green-200">
            <thead>
              <tr className="bg-green-100 text-emerald-700">
                <th className="px-4 py-3 text-left font-semibold border-b border-green-200">Nom</th>
                <th className="px-4 py-3 text-left font-semibold border-b border-green-200">Téléphone</th>
                <th className="px-4 py-3 text-left font-semibold border-b border-green-200">Adresse</th>
                <th className="px-4 py-3 text-left font-semibold border-b border-green-200">Email</th>
                <th className="px-4 py-3 text-center font-semibold border-b border-green-200">Bannir</th>
              </tr>
            </thead>
            <tbody>
              {clients.length > 0 ? (
                clients.map((client) => (
                  <tr key={client.id} className="hover:bg-green-50 transition">
                    <td className="px-4 py-2 border-b border-green-200 font-semibold text-base">{client.prenom} {client.name || client.nom}</td>
                    <td className="px-4 py-2 border-b border-green-200">{client.phone}</td>
                    <td className="px-4 py-2 border-b border-green-200">{client.address}</td>
                    <td className="px-4 py-2 border-b border-green-200">{client.email}</td>
                    <td className="px-4 py-2 border-b border-green-200 text-center">
                      <button
                        className="inline-flex items-center gap-1 bg-green-100 hover:bg-emerald-500 text-green-500 hover:text-white px-4 py-1.5 rounded-md shadow-sm font-medium transition-colors border border-green-200 hover:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                        title="Bannir ce client"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-12.728 12.728m0-12.728l12.728 12.728" />
                        </svg>
                        <span>Bannir</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-green-500">
                    Aucun client trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
