"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [popup, setPopup] = useState({ show: false, type: '', message: '' });

  const handleLogin = async (form) => {
    const res = await fetch("http://138.68.243.1:8008/api/auth/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", data.access);
      setPopup({ show: true, type: 'success', message: 'Connexion réussie !' });
      setTimeout(() => {
        setPopup({ show: false, type: '', message: '' });
        router.push("/");
      }, 1200);
    } else {
      setPopup({ show: true, type: 'error', message: 'Email ou mot de passe incorrect.' });
      setTimeout(() => setPopup({ show: false, type: '', message: '' }), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="w-full max-w-3xl flex rounded-3xl shadow-2xl overflow-hidden bg-white/80 border border-green-200">
        {/* Partie gauche : image + logo */}
        <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-cover bg-center relative" style={{backgroundImage: 'url(/coffee-bean.jpg)'}}>
          <div className="absolute inset-0 bg-black/30" />
        </div>
        {/* Partie droite : formulaire */}
        <div className="flex-1 flex flex-col justify-center items-center bg-white/80 backdrop-blur px-8 py-12">
          <h1 className="text-3xl font-bold text-emerald-700 mb-6">Welcome !</h1>
          <form onSubmit={e => { e.preventDefault(); handleLogin({
            username: e.target.username.value,
            password: e.target.password.value
          }); }} className="w-full max-w-xs space-y-5">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM12 14c-4.418 0-8 1.79-8 4v2h16v-2c0-2.21-3.582-4-8-4Z"/></svg>
              </span>
              <input name="username" type="text" required placeholder="@username" className="w-full pl-10 pr-3 py-2 rounded-lg border border-green-200 bg-white/90 text-emerald-700 placeholder-emerald-400 focus:ring-2 focus:ring-emerald-400 outline-none" />
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
              </span>
              <input name="password" type={showPassword ? "text" : "password"} required placeholder="Password" className="w-full pl-10 pr-10 py-2 rounded-lg border border-green-200 bg-white/90 text-emerald-700 placeholder-emerald-400 focus:ring-2 focus:ring-emerald-400 outline-none" />
              <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400 focus:outline-none">
                {showPassword ? (
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0 1 12 19c-5 0-9-4-9-7s4-7 9-7 9 4 9 7c0 1.306-.417 2.53-1.125 3.575M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" /></svg>
                ) : (
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7Z" /></svg>
                )}
              </button>
            </div>
            <div className="flex justify-between items-center text-xs text-emerald-400">
              <span>Forgot Password ?</span>
            </div>
            <button type="submit" className="w-full py-2 rounded-lg bg-emerald-500 hover:bg-emerald-700 text-white font-bold text-lg shadow-md transition-all">LOGIN</button>
          </form>
          <p className="text-center text-sm text-emerald-400 mt-6">
            Pas encore inscrit ? <a href="/register" className="text-emerald-700 hover:underline font-semibold">Créer un compte</a>
          </p>
          {popup.show && (
            <div className={`fixed top-8 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg text-white font-semibold transition-all
              ${popup.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'}`}
            >
              {popup.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
