"use client";

import { useState } from "react";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import EditProfileForm from "@/components/profile/EditProfileForm";
import ChangePasswordForm from "@/components/profile/ChangePasswordForm";
import { User } from "@/services/auth";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === "undefined") return null;
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch {
        return null;
      }
    }
    return null;
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("auth");
    setUser(null);
    setIsEditing(false);
    setIsChangingPassword(false);
  };

  const handleProfileUpdated = (updatedUser: User) => {
    setUser(updatedUser);
    setIsEditing(false);
  };

  return (
    <main className="min-h-screen bg-page text-text-primary pb-24 flex flex-col animate-fadeIn">
      <header className="bg-surface-dark w-full pt-6 pb-8 px-4 shadow-md flex flex-col items-center sm:items-start text-center sm:text-left">
        <div className="max-w-lg mx-auto w-full flex flex-col gap-2">
          <h1 className="font-lato text-2xl sm:text-3xl font-black text-text-secondary">
            Espace Voyageur
          </h1>
          <p className="text-xs sm:text-sm text-quinary-200 font-poppins">
            {user ? "Gérez vos préférences et informations personnelles." : "Gérez vos préférences de mobilité."}
          </p>
        </div>
      </header>

      <div className="max-w-lg mx-auto w-full px-4 mt-6">
        {user ? (
          <div className="bg-white p-6 rounded-2xl shadow-md border-2 border-border-surface flex flex-col gap-6">
            {isEditing ? (
              <EditProfileForm
                currentUser={user}
                onCancel={() => setIsEditing(false)}
                onSuccess={handleProfileUpdated}
              />
            ) : isChangingPassword ? (
              <ChangePasswordForm
                onCancel={() => setIsChangingPassword(false)}
                onSuccess={() => setIsChangingPassword(false)}
              />
            ) : (
              <>
                <div className="flex items-center gap-4 border-b border-quinary-200 pb-4">
                  <div className="w-12 h-12 rounded-full bg-action-primary text-text-secondary flex items-center justify-center font-bold text-lg font-lato">
                    {user.firstname ? user.firstname.charAt(0).toUpperCase() : "U"}
                  </div>
                  <div>
                    <h2 className="font-lato text-lg font-bold text-text-primary">
                      Bonjour, {user.firstname || "Voyageur"} !
                    </h2>
                    <p className="text-xs text-text-tertiary font-poppins">{user.email}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full bg-quinary-100 hover:bg-quinary-200 text-text-primary font-poppins text-sm font-medium py-3 px-4 rounded-lg transition-colors text-left flex justify-between items-center"
                  >
                    <span>Éditer mon profil</span>
                    <span className="material-symbols-outlined text-[20px] text-text-tertiary">edit</span>
                  </button>

                  <button
                    onClick={() => setIsChangingPassword(true)}
                    className="w-full bg-quinary-100 hover:bg-quinary-200 text-text-primary font-poppins text-sm font-medium py-3 px-4 rounded-lg transition-colors text-left flex justify-between items-center"
                  >
                    <span>Modifier mon mot de passe</span>
                    <span className="material-symbols-outlined text-[20px] text-text-tertiary">lock</span>
                  </button>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full bg-action-secondary hover:bg-action-secondary-hover text-white font-poppins font-bold text-sm py-3 rounded-lg shadow-md transition-colors mt-2"
                >
                  Se déconnecter
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="bg-white p-6 rounded-2xl shadow-md border-2 border-border-surface">
            {isRegistering ? (
              <RegisterForm onSwitchToLogin={() => setIsRegistering(false)} />
            ) : (
              <LoginForm onSwitchToRegister={() => setIsRegistering(true)} />
            )}
          </div>
        )}
      </div>
    </main>
  );
}