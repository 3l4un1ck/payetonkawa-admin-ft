"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { UserGroupIcon, PlusIcon } from '@heroicons/react/24/solid';

const API_URL = "https://payetonkawa-client-bk.elauriche.live/api/clients";

export default function ClientsList() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(setClients);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-teal-100 px-2 py-8 sm:px-4 sm:py-12">
      <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-4 sm:p-8 border border-blue-100">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 border-b pb-4 gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center bg-gradient-to-tr from-blue-400 to-teal-400 text-white rounded-full w-12 h-12 shadow-lg">
              <span className="text-2xl">👥</span>
            </span>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">Liste des Clients</h1>
              <p className="text-gray-500 text-sm mt-1">Voici tous les clients enregistrés dans le système.</p>
            </div>
          </div>
          <Link
            href="/clients/new"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-2 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all font-semibold text-lg"
          >
            <span className="text-xl">➕</span>
            <span>Ajouter</span>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-700 rounded-2xl shadow-lg bg-white/70 backdrop-blur border border-gray-200">
            <thead>
              <tr className="bg-gradient-to-r from-blue-50 to-teal-50">
                <th className="px-4 py-3 text-left font-semibold border-b">Avatar</th>
                <th className="px-4 py-3 text-left font-semibold border-b">Nom</th>
                <th className="px-4 py-3 text-left font-semibold border-b">Prénom</th>
                <th className="px-4 py-3 text-left font-semibold border-b">Email</th>
                <th className="px-4 py-3 text-left font-semibold border-b">Téléphone</th>
                <th className="px-4 py-3 text-left font-semibold border-b">Adresse</th>
                <th className="px-4 py-3 text-left font-semibold border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {clients.length > 0 ? (
                clients.map((client) => (
                  <tr key={client.id} className="hover:bg-blue-50/60 transition-all">
                    <td className="px-4 py-2 border-b">
                      <span
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full font-bold text-white shadow"
                        style={{
                          background: `linear-gradient(135deg, #38bdf8 0%, #14b8a6 100%)`,
                        }}
                      >
                        {client.nom && client.prenom
                          ? `${client.prenom[0] || ''}${client.nom[0] || ''}`.toUpperCase()
                          : '👤'}
                      </span>
                    </td>
                    <td className="px-4 py-2 border-b font-semibold">{client.nom}</td>
                    <td className="px-4 py-2 border-b">{client.prenom}</td>
                    <td className="px-4 py-2 border-b">{client.email}</td>
                    <td className="px-4 py-2 border-b">{client.telephone}</td>
                    <td className="px-4 py-2 border-b">{client.adresse}</td>
                    <td className="px-4 py-2 border-b">
                      <Link
                        href={`/clients/${client.id}`}
                        className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 hover:underline font-medium transition-colors"
                      >
                        <span className="text-base">✏️</span>
                        <span>Modifier</span>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-4 py-6 text-center text-gray-400">
                    Aucun client enregistré.
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
