"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    nom: "",
    type: "boite",
    categorie: "petite",
    format: "capsules",
    quantite: 0,
    prix: 0,
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleImage = e => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Préparer le formData pour upload
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value));
    if (imageFile) data.append("image", imageFile);
    // Ici tu écrirais dans le fichier JSON côté serveur (API route ou fs)
    alert("Produit ajouté (simulation, à implémenter côté serveur)");
    router.push("/admin/products");
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-10 border border-green-200 mt-8">
      <h1 className="text-3xl font-bold text-emerald-700 mb-8 text-center">Ajouter un produit</h1>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="space-y-6">
          <div>
            <label className="block mb-1 font-semibold text-green-500">Nom</label>
            <input name="nom" value={form.nom} onChange={handleChange} required className="w-full rounded-full px-4 py-2 border border-green-200 bg-white/80 text-emerald-700 placeholder-green-400 outline-none" />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-green-500">Type</label>
            <select name="type" value={form.type} onChange={handleChange} className="w-full rounded-full px-4 py-2 border border-green-200 bg-white/80 text-emerald-700">
              <option value="boite">Boîte</option>
              <option value="sachet">Sachet</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-semibold text-green-500">Catégorie</label>
            <select name="categorie" value={form.categorie} onChange={handleChange} className="w-full rounded-full px-4 py-2 border border-green-200 bg-white/80 text-emerald-700">
              <option value="petite">Petite</option>
              <option value="moyenne">Moyenne</option>
              <option value="grande">Grande</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-semibold text-green-500">Format</label>
            <select name="format" value={form.format} onChange={handleChange} className="w-full rounded-full px-4 py-2 border border-green-200 bg-white/80 text-emerald-700">
              <option value="capsules">Capsules machines</option>
              <option value="cafetière">Café pour cafetière</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-semibold text-green-500">Quantité disponible</label>
            <input type="number" name="quantite" value={form.quantite} onChange={handleChange} min="0" className="w-full rounded-full px-4 py-2 border border-green-200 bg-white/80 text-emerald-700" />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-green-500">Prix (€)</label>
            <input type="number" name="prix" value={form.prix} onChange={handleChange} min="0" step="0.01" className="w-full rounded-full px-4 py-2 border border-green-200 bg-white/80 text-emerald-700" />
          </div>
        </div>
        <div className="flex flex-col gap-6 justify-between">
          <div>
            <label className="block mb-1 font-semibold text-green-500">Image du produit</label>
            <input type="file" accept="image/*" onChange={handleImage} className="block w-full text-sm text-emerald-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-emerald-700 hover:file:bg-green-100" />
            {imagePreview && (
              <img src={imagePreview} alt="Aperçu" className="mt-4 rounded-xl w-full max-h-56 object-contain border border-green-200 shadow" />
            )}
          </div>
          <div>
            <label className="block mb-1 font-semibold text-green-500">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} className="w-full rounded-2xl px-4 py-2 border border-green-200 bg-white/80 text-emerald-700 min-h-[80px]" />
          </div>
          <button type="submit" className="w-full py-3 rounded-full bg-emerald-500 hover:bg-emerald-700 text-white font-bold text-lg shadow-md transition-all mt-4 active:scale-95">Ajouter le produit</button>
        </div>
      </form>
    </div>
  );
} 