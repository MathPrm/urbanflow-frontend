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
      } catch (e) {
        console.error("Erreur de parsing user", e);
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
    <div className="flex flex-col gap-6 animate-fadeIn p-4 max-w-md mx-auto">
      <div className="text-center mb-4">
        <h1 className="font-lato text-[24px] font-bold text-text-primary">
          Espace Voyageur
        </h1>
        <p className="text-sm text-text-tertiary font-poppins">
          {user ? "Gérez vos préférences et informations personnelles." : "Gérez vos préférences de mobilité."}
        </p>
      </div>

      {user ? (
        <div className="bg-white p-6 rounded-2xl shadow-md border border-quinary-200 flex flex-col gap-6">
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
                  <span>✏️</span>
                </button>

                <button
                  onClick={() => setIsChangingPassword(true)}
                  className="w-full bg-quinary-100 hover:bg-quinary-200 text-text-primary font-poppins text-sm font-medium py-3 px-4 rounded-lg transition-colors text-left flex justify-between items-center"
                >
                  <span>Modifier mon mot de passe</span>
                  <span>🔒</span>
                </button>
              </div>

              <button
                onClick={handleLogout}
                className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-poppins font-medium text-sm py-3 rounded-lg transition-colors border border-red-200 mt-2"
              >
                Se déconnecter
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="bg-white p-6 rounded-2xl shadow-md border border-quinary-200">
          {isRegistering ? (
            <RegisterForm onSwitchToLogin={() => setIsRegistering(false)} />
          ) : (
            <LoginForm onSwitchToRegister={() => setIsRegistering(true)} />
          )}
        </div>
      )}
    </div>
  );
}