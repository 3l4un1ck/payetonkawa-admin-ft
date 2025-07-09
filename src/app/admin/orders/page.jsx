"use client";
import { useState } from "react";

// Exemple de données provisoires
const commandesInitiales = [
  {
    numero: "PTK458117",
    date: "2024-05-25T21:30:00Z",
    client: {
      nom: "Dupont",
      prenom: "Marie",
      telephone: "0601020304",
      adresse: "12 rue des Fleurs, 75000 Paris"
    },
    produits: [
      { nom: "Café Arabica", quantite: 2, prix: 8.5 },
      { nom: "Blend Orange", quantite: 1, prix: 6.5 }
    ],
    total: 23.5
  },
  {
    numero: "PTK234567",
    date: "2024-05-24T18:10:00Z",
    client: {
      nom: "Martin",
      prenom: "Paul",
      telephone: "0611223344",
      adresse: "5 avenue Victor Hugo, 69000 Lyon"
    },
    produits: [
      { nom: "Café Décaféiné", quantite: 1, prix: 10 },
      { nom: "Blend Orange", quantite: 3, prix: 6.5 }
    ],
    total: 29.5
  },
  {
    numero: "PTK345678",
    date: "2024-05-23T15:45:00Z",
    client: {
      nom: "Bernard",
      prenom: "Lucie",
      telephone: "0622334455",
      adresse: "8 rue du Marché, 31000 Toulouse"
    },
    produits: [
      { nom: "Café Arabica", quantite: 1, prix: 8.5 },
      { nom: "Café Décaféiné", quantite: 2, prix: 10 }
    ],
    total: 28.5
  },
  {
    numero: "PTK456789",
    date: "2024-05-22T11:20:00Z",
    client: {
      nom: "Leroy",
      prenom: "Sophie",
      telephone: "0633445566",
      adresse: "22 avenue des Champs, 06000 Nice"
    },
    produits: [
      { nom: "Blend Orange", quantite: 4, prix: 6.5 }
    ],
    total: 26.0
  },
  {
    numero: "PTK567890",
    date: "2024-05-21T09:05:00Z",
    client: {
      nom: "Petit",
      prenom: "Jean",
      telephone: "0644556677",
      adresse: "3 rue de la Gare, 44000 Nantes"
    },
    produits: [
      { nom: "Café Arabica", quantite: 3, prix: 8.5 }
    ],
    total: 25.5
  },
  {
    numero: "PTK678901",
    date: "2024-05-20T16:40:00Z",
    client: {
      nom: "Durand",
      prenom: "Claire",
      telephone: "0655667788",
      adresse: "15 rue Victor Hugo, 69000 Lyon"
    },
    produits: [
      { nom: "Blend Orange", quantite: 2, prix: 6.5 },
      { nom: "Café Décaféiné", quantite: 1, prix: 10 }
    ],
    total: 23.0
  },
  {
    numero: "PTK789012",
    date: "2024-05-19T13:15:00Z",
    client: {
      nom: "Moreau",
      prenom: "Antoine",
      telephone: "0666778899",
      adresse: "10 rue des Lilas, 33000 Bordeaux"
    },
    produits: [
      { nom: "Café Arabica", quantite: 1, prix: 8.5 },
      { nom: "Blend Orange", quantite: 1, prix: 6.5 },
      { nom: "Café Décaféiné", quantite: 1, prix: 10 }
    ],
    total: 25.0
  }
];

export default function OrdersPage() {
  const [commandes] = useState(commandesInitiales);
  const [detailIndex, setDetailIndex] = useState(null);

  return (
    <div className="min-h-screen bg-green-50 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-green-200">
        <h1 className="text-3xl font-bold text-emerald-700 mb-8">Liste des commandes</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-emerald-700 rounded-xl bg-white border border-green-200">
            <thead>
              <tr className="bg-green-100 text-emerald-700">
                <th className="px-4 py-3 text-left font-semibold">N° Commande</th>
                <th className="px-4 py-3 text-left font-semibold">Date</th>
                <th className="px-4 py-3 text-left font-semibold">Client</th>
                <th className="px-4 py-3 text-left font-semibold">Téléphone</th>
                <th className="px-4 py-3 text-left font-semibold">Adresse</th>
                <th className="px-4 py-3 text-left font-semibold">Total (€)</th>
                <th className="px-4 py-3 text-center font-semibold">Détail</th>
              </tr>
            </thead>
            <tbody>
              {commandes.map((cmd, idx) => (
                <tr key={cmd.numero} className="border-t border-green-200 hover:bg-green-50 transition">
                  <td className="px-4 py-2 font-bold">{cmd.numero}</td>
                  <td className="px-4 py-2">{new Date(cmd.date).toLocaleString("fr-FR")}</td>
                  <td className="px-4 py-2">{cmd.client.prenom} {cmd.client.nom}</td>
                  <td className="px-4 py-2">{cmd.client.telephone}</td>
                  <td className="px-4 py-2">{cmd.client.adresse}</td>
                  <td className="px-4 py-2">{cmd.total.toFixed(2)}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      className="bg-emerald-500 hover:bg-emerald-700 text-white px-4 py-1 rounded-full text-xs font-medium transition"
                      onClick={() => setDetailIndex(detailIndex === idx ? null : idx)}
                    >
                      {detailIndex === idx ? "Fermer" : "Voir détail"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Détail de la commande */}
        {detailIndex !== null && (
          <div className="mt-8 p-6 rounded-xl border border-green-200 bg-green-50 shadow">
            <h2 className="text-xl font-bold text-emerald-700 mb-4">Détail de la commande {commandes[detailIndex].numero}</h2>
            <div className="mb-2 text-green-700">
              <span className="font-semibold">Client :</span> {commandes[detailIndex].client.prenom} {commandes[detailIndex].client.nom}<br />
              <span className="font-semibold">Téléphone :</span> {commandes[detailIndex].client.telephone}<br />
              <span className="font-semibold">Adresse :</span> {commandes[detailIndex].client.adresse}<br />
              <span className="font-semibold">Date :</span> {new Date(commandes[detailIndex].date).toLocaleString("fr-FR")}
            </div>
            <table className="min-w-full text-sm text-emerald-700 bg-white border border-green-200 mb-4">
              <thead>
                <tr className="bg-green-100 text-emerald-700">
                  <th className="px-4 py-2 text-left font-semibold">Produit</th>
                  <th className="px-4 py-2 text-left font-semibold">Quantité</th>
                  <th className="px-4 py-2 text-left font-semibold">Prix unitaire (€)</th>
                  <th className="px-4 py-2 text-left font-semibold">Total (€)</th>
                </tr>
              </thead>
              <tbody>
                {commandes[detailIndex].produits.map((prod, i) => (
                  <tr key={i} className="border-t border-green-200">
                    <td className="px-4 py-2">{prod.nom}</td>
                    <td className="px-4 py-2">{prod.quantite}</td>
                    <td className="px-4 py-2">{prod.prix.toFixed(2)}</td>
                    <td className="px-4 py-2">{(prod.quantite * prod.prix).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-right text-lg font-bold text-emerald-700">
              Total commande : {commandes[detailIndex].total.toFixed(2)} €
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 