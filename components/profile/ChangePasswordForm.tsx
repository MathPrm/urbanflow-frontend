"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import { changePassword } from "@/services/auth";

interface ChangePasswordFormProps {
  onCancel: () => void;
  onSuccess: () => void;
}

export default function ChangePasswordForm({ onCancel, onSuccess }: ChangePasswordFormProps) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!oldPassword) {
      setError("Veuillez saisir votre ancien mot de passe.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Le nouveau mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Les nouveaux mots de passe ne correspondent pas.");
      return;
    }

    if (oldPassword === newPassword) {
      setError("Le nouveau mot de passe doit être différent de l'ancien mot de passe.");
      return;
    }

    setIsLoading(true);
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (!token) {
      setError("Vous devez être connecté pour modifier votre mot de passe.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await changePassword({ oldPassword, newPassword }, token);
      setSuccessMessage(res.message || "Mot de passe modifié avec succès !");
      setTimeout(() => {
        onSuccess();
      }, 1000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue lors de la modification");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      <h2 className="font-lato text-[20px] font-bold text-text-primary">
        Modifier mon mot de passe
      </h2>

      {error && (
        <div role="alert" className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm font-poppins font-medium">
          {error}
        </div>
      )}

      {successMessage && (
        <div role="status" aria-live="polite" className="bg-green-50 border-2 border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm font-poppins font-medium">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Ancien mot de passe"
          id="old-password"
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          placeholder="••••••••"
          required
        />

        <Input
          label="Nouveau mot de passe"
          id="new-password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="•••••••• (min. 6 caractères)"
          required
          minLength={6}
        />

        <Input
          label="Confirmer le nouveau mot de passe"
          id="confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="••••••••"
          required
          minLength={6}
        />

        <div className="flex flex-col gap-2 mt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-action-primary hover:bg-action-primary-hover text-text-secondary font-poppins font-medium rounded-lg px-4 py-3 transition-colors disabled:opacity-50 flex justify-center items-center gap-2 shadow-md"
          >
            {isLoading ? (
              <span className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
            ) : (
              "Enregistrer le nouveau mot de passe"
            )}
          </button>

          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="w-full bg-quinary-100 hover:bg-quinary-200 text-text-primary font-poppins font-medium rounded-lg px-4 py-3 transition-colors text-center"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}
