"use client";
import AuthForm from "../../components/AuthForm";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const handleRegister = async (form) => {
    const res = await fetch("http://138.68.243.1:8008/api/auth/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/login");
    } else {
      alert("Erreur lors de l'inscription.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#ede6dd] via-[#f8f6f2] to-[#a58b6f] px-4">
      <div className="w-full max-w-md bg-white/90 rounded-3xl shadow-2xl p-8 sm:p-10 border border-[#e2d6c2] flex flex-col items-center">
        <h1 className="text-3xl font-bold text-[#6F4E37] mb-6 tracking-wide">REGISTER</h1>
        <form onSubmit={e => { e.preventDefault(); handleRegister({
          username: e.target.username.value,
          first_name: e.target.first_name.value,
          last_name: e.target.last_name.value,
          email: e.target.email.value,
          password: e.target.password.value,
          password2: e.target.password2.value,
        }); }} className="w-full space-y-4">
          <input name="username" required placeholder="Username" className="w-full px-4 py-2 rounded-full border border-[#e2d6c2] bg-white/80 text-[#6F4E37] placeholder-[#a58b6f] focus:ring-2 focus:ring-[#a58b6f] outline-none" />
          <input name="first_name" required placeholder="First Name" className="w-full px-4 py-2 rounded-full border border-[#e2d6c2] bg-white/80 text-[#6F4E37] placeholder-[#a58b6f] focus:ring-2 focus:ring-[#a58b6f] outline-none" />
          <input name="last_name" required placeholder="Last Name" className="w-full px-4 py-2 rounded-full border border-[#e2d6c2] bg-white/80 text-[#6F4E37] placeholder-[#a58b6f] focus:ring-2 focus:ring-[#a58b6f] outline-none" />
          <input name="email" type="email" required placeholder="Email" className="w-full px-4 py-2 rounded-full border border-[#e2d6c2] bg-white/80 text-[#6F4E37] placeholder-[#a58b6f] focus:ring-2 focus:ring-[#a58b6f] outline-none" />
          <input name="password" type="password" required placeholder="Password" className="w-full px-4 py-2 rounded-full border border-[#e2d6c2] bg-white/80 text-[#6F4E37] placeholder-[#a58b6f] focus:ring-2 focus:ring-[#a58b6f] outline-none" />
          <input name="password2" type="password" required placeholder="Confirm Password" className="w-full px-4 py-2 rounded-full border border-[#e2d6c2] bg-white/80 text-[#6F4E37] placeholder-[#a58b6f] focus:ring-2 focus:ring-[#a58b6f] outline-none" />
          <div className="flex items-center gap-2 mt-2">
            <input type="checkbox" required id="terms" className="accent-[#6F4E37] w-4 h-4 rounded" />
            <label htmlFor="terms" className="text-xs text-[#a58b6f]">J'accepte les <a href="#" className="text-[#6F4E37] underline">conditions d'utilisation</a></label>
          </div>
          <button type="submit" className="w-full py-2 rounded-full bg-emerald-500 hover:bg-emerald-700 text-white font-bold text-lg shadow-md transition-all mt-2 active:scale-95">REGISTER NOW</button>
        </form>
        <p className="text-center text-sm text-emerald-400 mt-6">
          Déjà un compte ? <a href="/login" className="text-emerald-700 hover:underline font-semibold">Se connecter</a>
        </p>
      </div>
    </div>
  );
}
