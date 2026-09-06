"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import { updateUserProfile, formatFirstname, User } from "@/services/auth";

interface EditProfileFormProps {
  currentUser: User;
  onCancel: () => void;
  onSuccess: (updatedUser: User) => void;
}

export default function EditProfileForm({ currentUser, onCancel, onSuccess }: EditProfileFormProps) {
  const [firstname, setFirstname] = useState(formatFirstname(currentUser.firstname || ""));
  const [email, setEmail] = useState(currentUser.email || "");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsLoading(true);

    const formatted = formatFirstname(firstname);
    setFirstname(formatted);

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (!token) {
      setError("Vous devez être connecté pour modifier votre profil.");
      setIsLoading(false);
      return;
    }

    try {
      const data = await updateUserProfile({ firstname, email }, token);

      if (data && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("auth", JSON.stringify({ token: data.token, user: data.user }));
      }

      setSuccessMessage("Profil mis à jour avec succès !");
      setTimeout(() => {
        onSuccess(data.user);
      }, 600);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue lors de la mise à jour");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      <h2 className="font-lato text-[20px] font-bold text-text-primary">
        Éditer mon profil
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
          label="Prénom"
          id="edit-firstname"
          type="text"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          placeholder="Ex: Mathilde"
          required
        />

        <Input
          label="Adresse e-mail"
          id="edit-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="votre@email.com"
          required
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
              "Enregistrer les modifications"
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
