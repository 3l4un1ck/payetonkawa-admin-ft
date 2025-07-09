"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const productImages = [
  "/admin/products/blend-orange.jpg",
  "/admin/products/bresil.jpg",
  "/admin/products/ethiopie.jpg",
];

function getRandomImage() {
  return productImages[Math.floor(Math.random() * productImages.length)];
}

const produits = [
  {
    id: 1,
    nom: "Café en Grain Ethiopie Djimmah G5",
    marque: "Café Bonnac",
    image: "/admin/products/ethiopie.jpg",
    type: "boite",
    categorie: "petite",
    format: "capsules",
    quantite: 20,
    prix: 6.25,
    description: "100% arabica, doux et épicé, torréfié moyen."
  },
  {
    id: 2,
    nom: "Café en Grain Presto - Blend Expresso Corsé",
    marque: "Graindecafe",
    image: "/admin/products/blend-orange.jpg",
    type: "sachet",
    categorie: "moyenne",
    format: "cafetière",
    quantite: 15,
    prix: 6.25,
    description: "Arabica/Robusta, corsé, épicé, torréfié foncé."
  },
  {
    id: 3,
    nom: "Café en Grain Presto - Blend Expresso Doux",
    marque: "Graindecafe",
    image: "/admin/products/ethiopie.jpg",
    type: "boite",
    categorie: "grande",
    format: "capsules",
    quantite: 10,
    prix: 6.5,
    description: "100% arabica, équilibré, épicé, torréfié moyen."
  },
  {
    id: 4,
    nom: "Café en Grain Presto - Blend Pietro",
    marque: "Graindecafe",
    image: "/admin/products/bresil.jpg",
    type: "sachet",
    categorie: "petite",
    format: "cafetière",
    quantite: 8,
    prix: 6.75,
    description: "100% arabica, corsé, goût italien, torréfié foncé."
  },
];

export default function ProductsTablePage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-green-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-emerald-700">Gestion des produits</h1>
          <Link href="/admin/products/new" className="bg-emerald-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-emerald-700 transition">Ajouter un produit</Link>
        </div>
        <div className="overflow-x-auto rounded-xl shadow-lg border border-green-200 bg-white">
          <table className="min-w-full text-sm text-emerald-700">
            <thead className="bg-green-100 text-emerald-700">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Image</th>
                <th className="px-4 py-3 text-left font-semibold">Nom</th>
                <th className="px-4 py-3 text-left font-semibold">Marque</th>
                <th className="px-4 py-3 text-left font-semibold">Type</th>
                <th className="px-4 py-3 text-left font-semibold">Catégorie</th>
                <th className="px-4 py-3 text-left font-semibold">Format</th>
                <th className="px-4 py-3 text-left font-semibold">Quantité</th>
                <th className="px-4 py-3 text-left font-semibold">Prix (€)</th>
                <th className="px-4 py-3 text-left font-semibold">Description</th>
                <th className="px-4 py-3 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {produits.map((prod) => (
                <tr key={prod.id} className="border-t border-green-200 hover:bg-green-50 transition cursor-pointer" onClick={e => {
                  // Ne pas déclencher si on clique sur un bouton dans la ligne
                  if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') return;
                  router.push(`/admin/products/${prod.id}/edit`);
                }}>
                  <td className="px-4 py-2">
                    <img src={prod.image} alt={prod.nom} className="w-24 h-24 object-contain rounded-lg border border-green-200 bg-green-50" />
                  </td>
                  <td className="px-4 py-2 font-bold">{prod.nom}</td>
                  <td className="px-4 py-2">{prod.marque}</td>
                  <td className="px-4 py-2">{prod.type}</td>
                  <td className="px-4 py-2">{prod.categorie}</td>
                  <td className="px-4 py-2">{prod.format}</td>
                  <td className="px-4 py-2">{prod.quantite}</td>
                  <td className="px-4 py-2">{prod.prix.toFixed(2)}</td>
                  <td className="px-4 py-2 max-w-xs truncate" title={prod.description}>{prod.description}</td>
                  <td className="px-4 py-2 text-center flex gap-2 justify-center">
                    <Link href={`/admin/products/${prod.id}/edit`} className="bg-green-400 text-white px-3 py-1 rounded-full text-xs font-medium hover:bg-emerald-500 transition">Modifier</Link>
                    <button className="bg-red-400 text-white px-3 py-1 rounded-full text-xs font-medium hover:bg-red-600 transition">Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 