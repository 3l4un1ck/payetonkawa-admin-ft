"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetch("/products.json")
      .then(res => res.json())
      .then(data => {
        const prod = data.find(p => String(p.id) === String(id));
        setForm(prod);
        setImagePreview(prod?.image || null);
        console.log("Produit chargé :", prod); // <-- Ajoute ceci
      });
  }, [id]);

  if (!form) return <div className="p-8 text-center">Chargement...</div>;

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
      setImagePreview(form.image);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Ici tu écrirais dans le fichier JSON côté serveur (API route ou fs)
    alert("Produit modifié (simulation, à implémenter côté serveur)");
    router.push("/admin/products");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-10 border border-green-200 mt-8">
      <h1 className="text-2xl font-bold text-emerald-700 mb-6">Modifier le produit</h1>
      {/* Carte produit */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-8 bg-green-50 rounded-2xl p-4 border border-green-200">
        <img src={imagePreview || form.image} alt={form.nom} className="w-32 h-40 object-contain rounded-xl border border-green-200 bg-white" />
        <div className="flex-1">
          <div className="text-green-500 text-sm font-semibold mb-1">{form.marque}</div>
          <div className="font-bold text-lg text-[#222] mb-2 leading-tight">{form.nom}</div>
          <div className="text-emerald-700 text-sm mb-1">Type : {form.type} | Catégorie : {form.categorie} | Format : {form.format}</div>
          <div className="text-emerald-700 text-sm mb-1">Quantité : {form.quantite} | Prix : {form.prix} €</div>
          <div className="text-green-500 text-xs">{form.description}</div>
        </div>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label className="block mb-1 font-semibold text-green-500">Nom</label>
          <input name="nom" value={form.nom} onChange={handleChange} required className="w-full rounded-full px-4 py-2 border border-green-200 bg-white/80 text-emerald-700 placeholder-green-400 outline-none" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold text-[#a58b6f]">Type</label>
            <select name="type" value={form.type} onChange={handleChange} className="w-full rounded-full px-4 py-2 border border-[#e2d6c2] bg-white/80 text-[#6F4E37]">
              <option value="boite">Boîte</option>
              <option value="sachet">Sachet</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-semibold text-[#a58b6f]">Catégorie</label>
            <select name="categorie" value={form.categorie} onChange={handleChange} className="w-full rounded-full px-4 py-2 border border-[#e2d6c2] bg-white/80 text-[#6F4E37]">
              <option value="petite">Petite</option>
              <option value="moyenne">Moyenne</option>
              <option value="grande">Grande</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold text-[#a58b6f]">Format</label>
            <select name="format" value={form.format} onChange={handleChange} className="w-full rounded-full px-4 py-2 border border-[#e2d6c2] bg-white/80 text-[#6F4E37]">
              <option value="capsules">Capsules machines</option>
              <option value="cafetière">Café pour cafetière</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-semibold text-[#a58b6f]">Quantité disponible</label>
            <input type="number" name="quantite" value={form.quantite} onChange={handleChange} min="0" className="w-full rounded-full px-4 py-2 border border-[#e2d6c2] bg-white/80 text-[#6F4E37]" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold text-[#a58b6f]">Prix (€)</label>
            <input type="number" name="prix" value={form.prix} onChange={handleChange} min="0" step="0.01" className="w-full rounded-full px-4 py-2 border border-[#e2d6c2] bg-white/80 text-[#6F4E37]" />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-[#a58b6f]">Image du produit</label>
            <input name="image" value={form.image} onChange={handleChange} className="w-full rounded-full px-4 py-2 border border-[#e2d6c2] bg-white/80 text-[#6F4E37]" />
            <input type="file" accept="image/*" onChange={handleImage} className="block w-full text-sm text-[#6F4E37] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#ede6dd] file:text-[#6F4E37] hover:file:bg-[#e2d6c2] mt-2" />
            {imagePreview && (
              <img src={imagePreview} alt="Aperçu" className="mt-3 rounded-xl w-32 h-32 object-contain border border-[#e2d6c2]" />
            )}
          </div>
        </div>
        <div>
          <label className="block mb-1 font-semibold text-[#a58b6f]">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} className="w-full rounded-2xl px-4 py-2 border border-[#e2d6c2] bg-white/80 text-[#6F4E37] min-h-[60px]" />
        </div>
        <button type="submit" className="w-full py-2 rounded-full bg-emerald-500 hover:bg-emerald-700 text-white font-bold text-lg shadow-md transition-all mt-2 active:scale-95">Enregistrer les modifications</button>
      </form>
    </div>
  );
} 