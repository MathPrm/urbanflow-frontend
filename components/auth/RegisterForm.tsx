"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import { registerUser, formatFirstname } from "@/services/auth";

interface RegisterFormProps {
  onSwitchToLogin: () => void;
  onRegisterSuccess?: () => void;
}

export default function RegisterForm({ onSwitchToLogin, onRegisterSuccess }: RegisterFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const formattedName = formatFirstname(name);
    setName(formattedName);

    try {
      const data = await registerUser({ email, password, firstname: formattedName });
      
      if (data && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("auth", JSON.stringify({ token: data.token, user: data.user }));
      }

      if (onRegisterSuccess) {
        onRegisterSuccess();
      } else {
        window.location.reload();
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue lors de l'inscription");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      <h2 className="font-lato text-[20px] font-bold text-text-primary">
        Créer un compte
      </h2>

      {error && (
        <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm font-poppins">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Prénom"
          id="register-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex: Mathilde"
          required
        />

        <Input
          label="Adresse e-mail"
          id="register-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="votre@email.com"
          required
        />

        <Input
          label="Mot de passe"
          id="register-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          minLength={6}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-action-primary hover:bg-action-primary-hover text-text-secondary font-poppins font-medium rounded-lg px-4 py-3 mt-1 transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
        >
          {isLoading ? (
            <span className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
          ) : (
            "Créer mon compte"
          )}
        </button>
      </form>

      <div className="text-center mt-2 border-t border-quinary-200 pt-4">
        <p className="text-sm text-text-tertiary font-poppins">
          Déjà un compte ?{" "}
          <button 
            type="button"
            onClick={onSwitchToLogin}
            className="font-bold text-action-primary hover:text-action-primary-hover transition-colors focus:outline-none"
          >
            Se connecter
          </button>
        </p>
      </div>
    </div>
  );
}