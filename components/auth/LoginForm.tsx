"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import { loginUser } from "@/services/auth";

interface LoginFormProps {
  onSwitchToRegister: () => void;
  onLoginSuccess?: () => void;
}

export default function LoginForm({ onSwitchToRegister, onLoginSuccess }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const data = await loginUser({ email, password });
      
      if (data && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("auth", JSON.stringify({ token: data.token, user: data.user }));
      }

      if (onLoginSuccess) {
        onLoginSuccess();
      } else {
        window.location.reload();
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue lors de la connexion");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      <h2 className="font-lato text-[20px] font-bold text-text-primary">
        Se connecter
      </h2>
      
      {error && (
        <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm font-poppins">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Adresse e-mail"
          id="login-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="votre@email.com"
          required
        />

        <Input
          label="Mot de passe"
          id="login-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-action-primary hover:bg-action-primary-hover text-text-secondary font-poppins font-medium rounded-lg px-4 py-3 mt-1 transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
        >
          {isLoading ? (
            <span className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
          ) : (
            "Se connecter"
          )}
        </button>
      </form>

      <div className="text-center mt-2 border-t border-quinary-200 pt-4">
        <p className="text-sm text-text-tertiary font-poppins">
          Nouveau sur UrbanFlow ?{" "}
          <button 
            type="button"
            onClick={onSwitchToRegister}
            className="font-bold text-action-primary hover:text-action-primary-hover transition-colors focus:outline-none"
          >
            Créer un compte
          </button>
        </p>
      </div>
    </div>
  );
}