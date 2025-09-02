"use client";

import ClientForm from "../../../components/ClientsForm";
import { useRouter } from "next/navigation";

export default function NewClient() {
  const router = useRouter();

  const handleSubmit = async (form) => {
  const token = localStorage.getItem("token");
  if (!token) return router.push("/login");

  // 1️⃣ Affiche dans la console les données du form reçues
  console.log("Form received in handleSubmit →", form);

  // 2️⃣ Mapping français → anglais
  const payload = {
    name:    form.nom,
    email:   form.email,
    phone:   form.telephone,
    address: form.adresse,
  };

  // 3️⃣ Affiche le payload exact qu'on envoie
  console.log("Payload JSON.stringify →", JSON.stringify(payload));

  try {
    const res = await fetch(
      "http://138.68.243.1:8008/api/clients/",
      {
        method:  "POST",
        headers: {
          "Content-Type":  "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      // 4️⃣ Récupère et logue l'erreur brute
      const errData = await res.json();
      console.group("Erreur création client");
      console.log("Status:", res.status);
      console.log("Response JSON error →", errData);
      console.groupEnd();
      alert(JSON.stringify(errData, null, 2));
      return;
    }

    // Si ok, redirection
    router.push("/clients");
  } catch (e) {
    console.error("Erreur réseau :", e);
    alert("Impossible de contacter le serveur. Réessaie plus tard.");
  }
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-white flex items-center justify-center px-2 py-8 sm:px-4 sm:py-12">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 sm:p-10 border border-green-200">
        <div className="flex flex-col items-center mb-8">
          <div className="inline-block bg-emerald-500 rounded-full p-3 shadow-md mb-2">
            {/* icône user */}
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-emerald-700 tracking-tight">Ajouter un Client</h1>
          <p className="text-green-500 mt-1 text-sm">Remplis ce formulaire pour enregistrer un nouveau client.</p>
        </div>
        {/* ici on utilise ton composant avec le mapping correct */}
        <ClientForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
