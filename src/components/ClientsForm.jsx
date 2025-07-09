"use client";
import { useState, useEffect } from "react";
import { UserIcon, EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/outline";

export default function ClientForm({ onSubmit, initialData, isEdit }) {
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    username: "",
    email: "",
    telephone: "",
    adresse: "",
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white/90 rounded-3xl shadow-2xl p-8 border border-[#e2d6c2]">
      <h2 className="text-2xl font-bold text-[#6F4E37] mb-6 flex items-center gap-2">
        <UserIcon className="w-7 h-7 text-[#a58b6f]" />
        {isEdit ? "Modifier un client" : "Ajouter un client"}
      </h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 text-green-500 font-semibold flex items-center gap-1">
              <UserIcon className="w-5 h-5" /> Nom
            </label>
            <input className="border border-green-200 rounded-full px-4 py-2 w-full focus:ring-2 focus:ring-emerald-400 bg-white/80 text-emerald-700 placeholder-green-400 outline-none transition" name="nom" value={form.nom} onChange={handleChange} placeholder="Nom" required />
          </div>
          <div>
            <label className="block mb-1 text-green-500 font-semibold flex items-center gap-1">
              <UserIcon className="w-5 h-5" /> Prénom
            </label>
            <input className="border border-green-200 rounded-full px-4 py-2 w-full focus:ring-2 focus:ring-emerald-400 bg-white/80 text-emerald-700 placeholder-green-400 outline-none transition" name="prenom" value={form.prenom} onChange={handleChange} placeholder="Prénom" required />
          </div>
          <div>
            <label className="block mb-1 text-green-500 font-semibold flex items-center gap-1">
              <UserIcon className="w-5 h-5" /> Nom d'utilisateur
            </label>
            <input className="border border-green-200 rounded-full px-4 py-2 w-full focus:ring-2 focus:ring-emerald-400 bg-white/80 text-emerald-700 placeholder-green-400 outline-none transition" name="username" value={form.username} onChange={handleChange} placeholder="Nom d'utilisateur" required />
          </div>
          <div>
            <label className="block mb-1 text-green-500 font-semibold flex items-center gap-1">
              <EnvelopeIcon className="w-5 h-5" /> Email
            </label>
            <input className="border border-green-200 rounded-full px-4 py-2 w-full focus:ring-2 focus:ring-emerald-400 bg-white/80 text-emerald-700 placeholder-green-400 outline-none transition" type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
          </div>
          <div>
            <label className="block mb-1 text-green-500 font-semibold flex items-center gap-1">
              <PhoneIcon className="w-5 h-5" /> Téléphone
            </label>
            <input className="border border-green-200 rounded-full px-4 py-2 w-full focus:ring-2 focus:ring-emerald-400 bg-white/80 text-emerald-700 placeholder-green-400 outline-none transition" name="telephone" value={form.telephone} onChange={handleChange} placeholder="Téléphone" required />
          </div>
          <div>
            <label className="block mb-1 text-green-500 font-semibold flex items-center gap-1">
              <MapPinIcon className="w-5 h-5" /> Adresse
            </label>
            <input className="border border-green-200 rounded-full px-4 py-2 w-full focus:ring-2 focus:ring-emerald-400 bg-white/80 text-emerald-700 placeholder-green-400 outline-none transition" name="adresse" value={form.adresse} onChange={handleChange} placeholder="Adresse" required />
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-3 rounded-full bg-gradient-to-r from-emerald-500 to-green-400 text-white font-bold text-lg shadow-md hover:scale-105 hover:shadow-lg transition-all mt-2 active:scale-95"
        >
          {isEdit ? "Enregistrer les modifications" : "Ajouter le client"}
        </button>
      </form>
    </div>
  );
}
