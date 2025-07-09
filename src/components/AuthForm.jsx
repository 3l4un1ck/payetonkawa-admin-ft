"use client";
import { useState } from "react";

export default function AuthForm({ type, onSubmit }) {
  const isLogin = type === "login";

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    first_name: "",
    last_name: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="username"
          placeholder="Nom d’utilisateur"
          value={form.username}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
      {!isLogin && (
        <>
          <input
            name="first_name"
            placeholder="Prénom"
            value={form.first_name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            name="last_name"
            placeholder="Nom"
            value={form.last_name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
            <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </>
      )}

      <input
        name="password"
        type="password"
        placeholder="Mot de passe"
        value={form.password}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded-lg"
        required
      />
      {!isLogin && (
        <input
          name="password2"
          type="password"
          placeholder="Confirmer le mot de passe"
          value={form.password2}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
      )}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-semibold hover:scale-105 transition"
      >
        {isLogin ? "Se connecter" : "S’inscrire"}
      </button>
    </form>
  );
}
